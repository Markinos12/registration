const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit();
    }
    console.log("Connected to MySQL database.");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Register user
app.post('/register', (req, res) => {
    const { name, surname, phone, country, date } = req.body;

    if (!name || !surname || !phone || !country || !date) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const query = `INSERT INTO users (name, surname, phone, country, registration_date) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, surname, phone, country, date], (err) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Failed to save data." });
        }
        res.status(200).json({ message: "Registration successful!" });
    });
});

// Get all users
app.get('/get-users', (req, res) => {
    const query = `SELECT name, surname, phone, country, registration_date FROM users ORDER BY id DESC`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ message: "Failed to fetch data." });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
