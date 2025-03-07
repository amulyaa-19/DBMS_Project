import React, { useState } from "react";
import axios from "axios";
import "./Update.css";



const Update = () => {

  const formatDate = (dob) => {
    if (!dob) return ""; // Handle empty values
    const date = new Date(dob);
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
  };
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    branch: "",
    phone: "",
    hostel_number:"",
    room_number:"",
    dob: "",
  });
  const [buttonColor, setButtonColor] = useState("grey");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch student details by ID
  const fetchStudent = async () => {
    if (!studentId.trim()) {
      setError("Please enter a valid Student ID.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:8000/students/${studentId}`);
      setStudent(res.data);
      setFormData({
        name: res.data.student_name || "",
        regno: res.data.registration || "",
        branch: res.data.branch || "",
        phone: res.data.phone || "",
        hostel_number: res.data.hostel_number || "",
        room_number: res.data.room_number || "",
        dob: formatDate(res.data.dob) || ""
      });
      setButtonColor("green"); // Student found, turn button green
    } catch (error) {
      console.error("Error fetching student:", error);
      setError("Student not found!");
      setStudent(null);
      setButtonColor("red"); // Student not found, turn button red
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update student details
  const handleUpdate = async () => {
    if (!student) {
      setError("No student selected for updating.");
      return;
    }
    if (!formData.name.trim() || !formData.regno.trim() || !formData.branch.trim() || !formData.phone.trim() ||!formData.hostel_number.trim()||!formData.room_number.trim()|| !formData.dob.trim()) {
      setError("All fields are required.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    const formattedDOB = new Date(formData.dob).toISOString().split("T")[0];
  
    const updatedData = {
      student_name: formData.name,
      registration: formData.regno,
      branch: formData.branch,
      phone: formData.phone,
      dob: formattedDOB,
      hostel_number: formData.hostel_number,
      room_number: formData.room_number
    };
  
    try {
      const response = await axios.put(`http://localhost:8000/students/${formData.regno}`, updatedData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.status === 200) {
        alert("Student updated successfully!");
        setStudent(null);
        setStudentId("");
        setButtonColor("grey");
      } else {
        setError("Failed to update student.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      setError("Failed to update student.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="update-page-container">
      <div className="update-content-box">
        <h2>Update Student</h2>

        <div className="fetch-section">
          <input
            type="text"
            placeholder="Enter Registration no."
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="fetch-input"
          />
          <button
            onClick={fetchStudent}
            className="fetch-button"
            style={{ backgroundColor: buttonColor }}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Student"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {student && (
          <div className="update-form-layout">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="update-input-field"
            />
            <input
              type="text"
              name="regno"
              placeholder="Registration Number"
              value={formData.regno}
              onChange={handleChange}
              className="update-input-field"
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              className="update-input-field"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="update-input-field"
            />
            <input
              type="text"
              name="hostel_number"
              placeholder="Hostel Number"
              value={formData.hostel_number}
              onChange={handleChange}
              className="update-input-field"
            />
            <input
              type="text"
              name="room_number"
              placeholder="Room Number"
              value={formData.room_number}
              onChange={handleChange}
              className="update-input-field"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="update-input-field"
            />
            <button onClick={handleUpdate} className="update-action-button" disabled={loading}>
              {loading ? "Updating..." : "Update Student"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;