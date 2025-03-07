import React, { useState } from "react";
import axios from "axios";
import "./Delete.css";

const Delete = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [buttonColor, setButtonColor] = useState("grey");

  // Fetch Student Details
  const fetchStudent = async () => {
    if (!studentId) {
      alert("Please enter a Student Registration Number.");
      setButtonColor("red");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/students/${studentId}`);
      setStudentData(response.data);
      setButtonColor("green");
    } catch (error) {
      console.error("Student not found:", error);
      setStudentData(null);
      setButtonColor("red");
      alert("Student not found.");
    }
  };

  // Delete Student Record
  const deleteStudent = async () => {
    if (!studentId) return;

    try {
      await axios.delete(`http://localhost:8000/students/${studentId}`);
      alert("Student record deleted successfully!");
      setStudentData(null);
      setStudentId("");
      setButtonColor("grey");
    } catch (error) {
      console.error("Error deleting student record:", error);
      alert("Failed to delete student record.");
      setButtonColor("red");
    }
  };

  return (
    <div className="delete-page-container">
      <div className="delete-content-box">
        <h2>Delete a Student Record</h2>
        <input
          type="text"
          placeholder="Enter Student Registration Number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="delete-input-field"
        />
        <button onClick={fetchStudent} className="delete-action-button" style={{ backgroundColor: buttonColor }}>
          Fetch Student
        </button>

        {studentData && (
          <div className="delete-student-details">
            <h3>{studentData.student_name}</h3>
            <p><strong>Branch:</strong> {studentData.branch}</p>
            <p><strong>Room Number:</strong> {studentData.room_number}</p>
            <p><strong>Phone:</strong> {studentData.phone}</p>
            <button onClick={deleteStudent} className="delete-action-button delete-button">
              Delete Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delete;