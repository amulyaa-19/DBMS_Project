import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from backend
    fetch("http://localhost:8000/students")  // Update with your API endpoint
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className="container">
      <h2 className="title">Hostel Student Details</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Branch</th>
            <th>Phone</th>
            <th>Hostel No.</th>
            <th>Room No.</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.student_name}</td>
                <td>{student.registration}</td>
                <td>{student.branch}</td>
                <td>{student.phone}</td>
                <td>{student.hostel_number}</td>
                <td>{student.room_number}</td>
                <td>{new Date(student.dob).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
