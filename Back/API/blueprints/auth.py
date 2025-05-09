import logging
from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .dao import cur, conn
from psycopg2 import sql, DatabaseError
import os

# Create blueprint for authentication
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    POST /api/greenlake-eval/auth/login
    Authenticate a user and return a JWT token
    """
    # Get request data
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({
            "status": "error",
            "message": "Username and password are required"
        }), 400
    
    username = data['username']
    password = data['password']
    
    try:
        # Find user by username
        cur.execute(
            "SELECT user_id, username, password_hash, is_admin FROM users.user_accounts WHERE username = %s",
            (username,)
        )
        user = cur.fetchone()
        
        # Check if user exists and password is correct
        if not user or not check_password_hash(user[2], password):
            return jsonify({
                "status": "error",
                "message": "Invalid credentials"
            }), 401
        
        user_id, username, _, is_admin = user
        
        # Generate token using flask_jwt_extended - CONVERT TO STRING
        access_token = create_access_token(identity=str(user_id))
        
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "user_id": user_id,
            "username": username,
            "is_admin": is_admin,
            "token": access_token
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

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    POST /api/greenlake-eval/auth/register
    Register a new user and return a JWT token
    """
    # Get request data
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({
            "status": "error",
            "message": "Username, email, and password are required"
        }), 400
    
    username = data['username']
    email = data['email']
    password = data['password']
    
    try:
        # Check if username already exists
        cur.execute(
            "SELECT user_id FROM users.user_accounts WHERE username = %s",
            (username,)
        )
        if cur.fetchone():
            return jsonify({
                "status": "error",
                "message": "Username already taken"
            }), 409
        
        # Check if email already exists
        cur.execute(
            "SELECT user_id FROM users.user_accounts WHERE email = %s",
            (email,)
        )
        if cur.fetchone():
            return jsonify({
                "status": "error",
                "message": "Email already registered"
            }), 409
        
        # Hash the password
        password_hash = generate_password_hash(password)
        
        # Insert new user
        cur.execute(
            "INSERT INTO users.user_accounts (username, email, password_hash) VALUES (%s, %s, %s) RETURNING user_id",
            (username, email, password_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        
        # Generate token using flask_jwt_extended - CONVERT TO STRING
        access_token = create_access_token(identity=str(user_id))
        
        return jsonify({
            "status": "success",
            "message": "Registration successful",
            "user_id": user_id,
            "username": username,
            "token": access_token
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

@auth_bp.route('/user/tables', methods=['POST'])
def assign_table_to_user():
    """
    POST /api/greenlake-eval/auth/user/tables
    Assign a table to a user
    """
    # Get request data
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('user_id') or not data.get('table_name'):
        return jsonify({
            "status": "error",
            "message": "User ID and table name are required"
        }), 400
    
    user_id = data['user_id']
    table_name = data['table_name']
    
    try:
        # Check if user exists
        cur.execute(
            "SELECT user_id FROM users.user_accounts WHERE user_id = %s",
            (user_id,)
        )
        if not cur.fetchone():
            return jsonify({
                "status": "error",
                "message": "User not found"
            }), 404
        
        # Insert user-table relation
        cur.execute(
            "INSERT INTO users.user_table_relations (user_id, table_name) VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (user_id, table_name)
        )
        
        # Commit the transaction
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": f"Table {table_name} assigned to user {user_id}"
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

@auth_bp.route('/user/tables/<int:user_id>', methods=['GET'])
def get_user_tables(user_id):
    """
    GET /api/greenlake-eval/auth/user/tables/<user_id>
    Get all tables assigned to a user
    """
    try:
        # Check if user exists
        cur.execute(
            "SELECT user_id FROM users.user_accounts WHERE user_id = %s",
            (user_id,)
        )
        if not cur.fetchone():
            return jsonify({
                "status": "error",
                "message": "User not found"
            }), 404
        
        # Get all tables assigned to user
        cur.execute(
            "SELECT table_name FROM users.user_table_relations WHERE user_id = %s",
            (user_id,)
        )
        tables = [row[0] for row in cur.fetchall()]
        
        return jsonify({
            "status": "success",
            "user_id": user_id,
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