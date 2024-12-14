-- database.sql
CREATE DATABASE website_db;

USE website_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    country VARCHAR(50) NOT NULL,
    registration_date DATE NOT NULL
);
