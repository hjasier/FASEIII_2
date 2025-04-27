from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur, conn
from psycopg2 import sql, DatabaseError
import os
from flask_jwt_extended import jwt_required, get_jwt_identity

# Create blueprint for project management
projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/create', methods=['POST'])
@jwt_required()
def create_project():
    # Get user identity from JWT token
    current_user_id = get_jwt_identity()
    
    # Get request data
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('project_name'):
        return jsonify({
            "status": "error",
            "message": "Project name is required"
        }), 400
    
    project_name = data['project_name']
    project_description = data.get('description', '')  # Get description, default to empty string
    tables = data.get('tables', [])  # Get tables list
    
    try:
        # First, verify the user exists in your database
        cur.execute("SELECT user_id FROM users.user_accounts WHERE user_id = %s", (current_user_id,))
        user_result = cur.fetchone()
        
        if not user_result:
            return jsonify({
                "status": "error",
                "message": "User not found"
            }), 404
            
        user_id = user_result[0]
        
        # Check if a project with this name already exists for the user
        cur.execute(
            "SELECT project_id FROM users.projects WHERE user_id = %s AND project_name = %s",
            (user_id, project_name)
        )
        if cur.fetchone():
            return jsonify({
                "status": "error",
                "message": "A project with this name already exists"
            }), 409
        
        # Create new project with description
        cur.execute(
            "INSERT INTO users.projects (user_id, project_name, description) VALUES (%s, %s, %s) RETURNING project_id",
            (user_id, project_name, project_description)
        )
        project_id = cur.fetchone()[0]
        
        # Add tables to the project
        for table_name in tables:
            cur.execute(
                "INSERT INTO users.project_tables (project_id, table_name) VALUES (%s, %s)",
                (project_id, table_name)
            )
        
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": "Project created successfully",
            "project_id": project_id
        }), 201
        
    except DatabaseError as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500
    
    except Exception as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500

@projects_bp.route('/add_tables', methods=['POST'])
def add_tables_to_project(current_user):
    """
    POST /projects/add_tables
    Add tables to an existing project
    """
    # Get request data
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('project_id') or not data.get('tables'):
        return jsonify({
            "status": "error",
            "message": "Project ID and tables are required"
        }), 400
    
    project_id = data['project_id']
    tables = data['tables']
    user_id = current_user['user_id']
    
    if not isinstance(tables, list) or not tables:
        return jsonify({
            "status": "error",
            "message": "Tables must be a non-empty array"
        }), 400
    
    try:
        # Check if the project exists and belongs to the user
        cur.execute(
            "SELECT project_name FROM users.projects WHERE project_id = %s AND user_id = %s",
            (project_id, user_id)
        )
        project = cur.fetchone()
        
        if not project:
            return jsonify({
                "status": "error",
                "message": "Project not found or you don't have permission to access it"
            }), 404
        
        project_name = project[0]
        
        # Add tables to the project
        tables_added = 0
        for table_name in tables:
            # Check if table already exists in the project
            cur.execute(
                "SELECT 1 FROM users.project_tables WHERE project_id = %s AND table_name = %s",
                (project_id, table_name)
            )
            if cur.fetchone():
                continue  # Skip if already exists
                
            cur.execute(
                "INSERT INTO users.project_tables (project_id, table_name) VALUES (%s, %s)",
                (project_id, table_name)
            )
            tables_added += 1
        
        # Commit the transaction
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": f"{tables_added} tables added to project '{project_name}'",
            "project_id": project_id,
            "project_name": project_name,
            "tables_added": tables_added
        }), 200
    
    except DatabaseError as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500
    
    except Exception as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500

@projects_bp.route('/tables/<int:project_id>', methods=['GET'])
@jwt_required()
def get_project_tables(project_id):
    """
    GET /projects/tables/{project_id}
    Get all tables in a project
    """
    # Get user identity from JWT token
    current_user_id = get_jwt_identity()
    
    try:
        # Check if the project exists and belongs to the user
        cur.execute(
            "SELECT project_name FROM users.projects WHERE project_id = %s AND user_id = %s",
            (project_id, current_user_id)
        )
        project = cur.fetchone()
        
        if not project:
            return jsonify({
                "status": "error",
                "message": "Project not found or you don't have permission to access it"
            }), 404
        
        project_name = project[0]
        
        # Get all tables in the project
        cur.execute(
            "SELECT table_name FROM users.project_tables WHERE project_id = %s",
            (project_id,)
        )
        tables = [row[0] for row in cur.fetchall()]
        
        return jsonify({
            "status": "success",
            "project_id": project_id,
            "project_name": project_name,
            "tables": tables
        }), 200
    
    except DatabaseError as e:
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500

@projects_bp.route('/list', methods=['GET'])
@jwt_required()
def list_user_projects():
    """
    GET /projects/list
    List all projects for the authenticated user
    """
    # Get user identity from JWT token
    current_user_id = get_jwt_identity()
    
    try:
        # Get all projects for the user with additional details
        cur.execute(
            """
            SELECT p.project_id, p.project_name, p.description, 
                   COUNT(pt.table_name) as table_count,
                   p.created_at
            FROM users.projects p
            LEFT JOIN users.project_tables pt ON p.project_id = pt.project_id
            WHERE p.user_id = %s
            GROUP BY p.project_id, p.project_name, p.description, p.created_at
            """,
            (current_user_id,)
        )
        
        projects = []
        for row in cur.fetchall():
            project = {
                "id": row[0],
                "name": row[1],
                "description": row[2] or "",  # Handle null descriptions
                "table_count": row[3],
                "createdAt": row[4].strftime("%Y-%m-%d") if row[4] else None
            }
            projects.append(project)
        
        return jsonify({
            "status": "success",
            "user_id": current_user_id,
            "projects": projects
        }), 200
        
    except DatabaseError as e:
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500

@projects_bp.route('/delete/<int:project_id>', methods=['DELETE'])
def delete_project(current_user, project_id):
    """
    DELETE /projects/delete/{project_id}
    Delete a project and all its associated tables
    """
    user_id = current_user['user_id']
    
    try:
        # Check if the project exists and belongs to the user
        cur.execute(
            "SELECT project_name FROM users.projects WHERE project_id = %s AND user_id = %s",
            (project_id, user_id)
        )
        project = cur.fetchone()
        
        if not project:
            return jsonify({
                "status": "error",
                "message": "Project not found or you don't have permission to delete it"
            }), 404
        
        project_name = project[0]
        
        # Delete the project (cascade will delete related records in project_tables)
        cur.execute(
            "DELETE FROM users.projects WHERE project_id = %s",
            (project_id,)
        )
        
        # Commit the transaction
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": f"Project '{project_name}' deleted successfully"
        }), 200
    
    except DatabaseError as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500
    
    except Exception as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500

@projects_bp.route('/remove_table', methods=['POST'])
def remove_table_from_project(current_user):
    """
    POST /projects/remove_table
    Remove a table from a project
    """
    # Get request data
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('project_id') or not data.get('table_name'):
        return jsonify({
            "status": "error",
            "message": "Project ID and table name are required"
        }), 400
    
    project_id = data['project_id']
    table_name = data['table_name']
    user_id = current_user['user_id']
    
    try:
        # Check if the project exists and belongs to the user
        cur.execute(
            "SELECT project_name FROM users.projects WHERE project_id = %s AND user_id = %s",
            (project_id, user_id)
        )
        project = cur.fetchone()
        
        if not project:
            return jsonify({
                "status": "error",
                "message": "Project not found or you don't have permission to access it"
            }), 404
        
        project_name = project[0]
        
        # Remove the table from the project
        cur.execute(
            "DELETE FROM users.project_tables WHERE project_id = %s AND table_name = %s",
            (project_id, table_name)
        )
        
        if cur.rowcount == 0:
            return jsonify({
                "status": "error",
                "message": f"Table '{table_name}' not found in project '{project_name}'"
            }), 404
        
        # Commit the transaction
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": f"Table '{table_name}' removed from project '{project_name}'"
        }), 200
    
    except DatabaseError as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500
    
    except Exception as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500