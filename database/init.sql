-- =============================================
-- FinResolve Database Initialization Script
-- =============================================

-- Create the database
CREATE DATABASE IF NOT EXISTS finresolve_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE finresolve_db;

-- =============================================
-- Example: Users table
-- =============================================
-- CREATE TABLE IF NOT EXISTS users (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     first_name VARCHAR(100),
--     last_name VARCHAR(100),
--     role ENUM('ADMIN', 'USER') DEFAULT 'USER',
--     active BOOLEAN DEFAULT TRUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- Add your tables here as the application evolves
