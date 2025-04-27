import os
import csv
import io
import pandas as pd
from flask import Blueprint, jsonify, request, send_file
import psycopg2
from werkzeug.utils import secure_filename
from sqlalchemy import text, create_engine, MetaData, Table, inspect

export_bp = Blueprint('export', __name__)

# Database configuration
DB_CONFIG = {
    "dbname": "greenlake_data",
    "user": "admin",
    "password": "overF!tHT25", 
    "host": "10.10.76.241",
    "port": "6565"
}

# Create SQLAlchemy engine
def get_db_engine():
    return create_engine(f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}")

@export_bp.route('/upload_csv', methods=['POST'])
def upload_csv():
    """Upload a CSV file and insert its contents to a specified table"""
    try:
        # Check if the request contains the file and table name
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400
            
        if not file.filename.endswith('.csv'):
            return jsonify({'message': 'File must be a CSV'}), 400
        
        table_name = request.form.get('table')
        if not table_name:
            return jsonify({'message': 'Table name not provided'}), 400
            
        # Check if the first row contains headers
        has_headers = request.form.get('headers', 'true').lower() == 'true'
        
        # Secure the filename and save temporarily
        filename = secure_filename(file.filename)
        file_path = os.path.join('/tmp', filename)
        file.save(file_path)
        
        # Load CSV with pandas
        try:
            if has_headers:
                df = pd.read_csv(file_path)
            else:
                # Read without header and generate column names
                df = pd.read_csv(file_path, header=None)
                
            # Connect to the database using SQLAlchemy
            engine = get_db_engine()
            inspector = inspect(engine)
            
            schema = 'public'  # Default schema
            if '.' in table_name:
                schema, table_name = table_name.split('.', 1)
                
            if table_name not in inspector.get_table_names(schema=schema):
                engine.dispose()
                os.remove(file_path)
                return jsonify({'message': f'Table {schema}.{table_name} does not exist'}), 400
                
            # Get column information from the database
            db_columns = inspector.get_columns(table_name, schema=schema)
            db_column_names = [col['name'] for col in db_columns]
            
            if has_headers:
                # Check if CSV columns match table columns
                csv_columns = df.columns.tolist()
                
                # If CSV has more columns than the table, filter extra columns
                if len(csv_columns) > len(db_column_names):
                    df = df[df.columns.intersection(db_column_names)]
                    
                # If some required columns are missing, return an error
                missing_columns = set(db_column_names) - set(df.columns)
                if missing_columns:
                    engine.dispose()
                    os.remove(file_path)
                    return jsonify({
                        'message': f'Missing required columns: {", ".join(missing_columns)}'
                    }), 400
            else:
                # If no headers, assume columns are in the same order as the table
                if len(df.columns) > len(db_column_names):
                    df = df.iloc[:, :len(db_column_names)]
                df.columns = db_column_names[:len(df.columns)]
                
                # If CSV has fewer columns than required
                if len(df.columns) < len(db_column_names):
                    engine.dispose()
                    os.remove(file_path)
                    return jsonify({
                        'message': f'CSV has {len(df.columns)} columns, but table requires {len(db_column_names)}'
                    }), 400
            
            # Insert data into the database
            rows_inserted = df.to_sql(
                name=table_name, 
                schema=schema,
                con=engine, 
                if_exists='append', 
                index=False
            )
            
            # Clean up
            engine.dispose()
            os.remove(file_path)
            
            return jsonify({
                'message': 'CSV file uploaded and processed successfully',
                'rows_inserted': len(df)
            })
            
        except Exception as e:
            # Clean up in case of error
            try:
                os.remove(file_path)
            except:
                pass
            raise e
            
    except Exception as e:
        return jsonify({'message': f'Error processing CSV: {str(e)}'}), 500

def register_blueprint(app):
    app.register_blueprint(export_bp)