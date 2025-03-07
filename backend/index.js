import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({path:"./.env"})
const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


db.connect((err) => {
    if (err) {
        console.error(" Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});


app.get("/", (req, res) => {
    res.json("Backend is running...");
});


app.post("/students", (req, res) => {
    const { registration, student_name, branch, phone, dob, hostel_number, room_number } = req.body;

    if (!registration || !student_name || !branch || !phone || !dob || !hostel_number || !room_number) {
        return res.status(400).json({ error: " All fields are required" });
    }

    const query = `INSERT INTO hostel_management (registration, student_name, branch, phone, dob, hostel_number, room_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [registration, student_name, branch, phone, dob, hostel_number, room_number], (err, result) => {
        if (err) {
            console.error(" Error inserting student:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Student added successfully", studentId: registration });
    });
});


app.get("/students", (req, res) => {
    db.query("SELECT * FROM hostel_management", (err, data) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: " Database error" });
        }
        res.json(data);
    });
});

app.get("/students/:registration", (req, res) => {
    const registration = req.params.registration;
    const query = "SELECT * FROM hostel_management WHERE registration = ?";

    db.query(query, [registration], (err, result) => {
        if (err) {
            console.error(" Error fetching student:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(result[0]);
    });
});



app.put("/students/:registration", (req, res) => {
    const registration = req.params.registration;
    const { student_name, branch, phone, dob, hostel_number, room_number } = req.body;

    console.log(student_name);
    console.log(branch);
    console.log(phone);
    console.log(dob);
    console.log(hostel_number);
    console.log(room_number);

    if (!student_name || !branch || !phone || !dob || !hostel_number || !room_number) {
        return res.status(400).json({ error: " All fields are required for update" });
    }
    const formattedDOB = new Date(dob).toISOString().split("T")[0]; // Ensure YYYY-MM-DD format

    const query = "UPDATE hostel_management SET student_name = ?, branch = ?, phone = ?, dob = ?, hostel_number = ?, room_number = ? WHERE registration = ?";

    db.query(query, [student_name, branch, phone, formattedDOB, hostel_number, room_number, registration], (err, result) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).json({ error: " Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: " Student not found or no changes made" });
        }
        res.json({ message: "Student updated successfully!" });
    });
}); 


app.delete("/students/:registration", (req, res) => {
    const registration = req.params.registration;
    const query = "DELETE FROM hostel_management WHERE registration = ?";

    db.query(query, [registration], (err, result) => {
        if (err) {
            console.error(" Error deleting student:", err);
            return res.status(500).json({ error: " Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: " Student not found" });
        }
        res.json({ message: " Student deleted successfully!" });
    });
});

app.post("/custom-query", (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: " Query is required" });
    }

    db.query(query, (err, result) => {
        if (err) {
            console.error(" Error executing query:", err);
            return res.status(500).json({ error: " Database error" });
        }
        res.json(result);
    });
});


app.listen(8000, () => {
    console.log("Server running on port 8000.");
});
