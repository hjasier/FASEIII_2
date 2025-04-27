-- Create the schema
CREATE SCHEMA IF NOT EXISTS users;

-- Create the users table
CREATE TABLE users.user_accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE users.projects (
    project_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users.user_accounts(user_id) ON DELETE CASCADE
);

-- Create the project_tables table
CREATE TABLE users.project_tables (
    project_table_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    table_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES users.projects(project_id) ON DELETE CASCADE
);
