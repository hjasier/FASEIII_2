-- Create the schema
CREATE SCHEMA IF NOT EXISTS users;

-- Create the users table
CREATE TABLE users.user_accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

-- Create the user-table relations table
CREATE TABLE users.user_table_relations (
    user_id INTEGER NOT NULL,
    table_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, table_name),
    FOREIGN KEY (user_id) REFERENCES users.user_accounts(user_id) ON DELETE CASCADE
);