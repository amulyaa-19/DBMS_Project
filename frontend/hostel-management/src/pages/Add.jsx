import React, { useState } from "react";
import axios from "axios";
import "./Add.css";

const Add = () => {
  const [formData, setFormData] = useState({
    registration: "",
    student_name: "",
    branch: "",
    phone: "",
    dob: "",
    hostel_number: "",
    room_number: "",
  });

  const [buttonColor, setButtonColor] = useState("grey");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field.trim() === "")) {
      alert("All fields are required.");
      setButtonColor("red"); // Indicate error
      return;
    }

    try {
      await axios.post("http://localhost:8000/students", formData);
      alert("Student added successfully!");
      setFormData({
        registration: "",
        student_name: "",
        branch: "",
        phone: "",
        dob: "",
        hostel_number: "",
        room_number: "",
      }); // Reset form
      setButtonColor("green"); // Indicate success
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
      setButtonColor("red");
    }
  };

  return (
    <div className="add-page-container">
      <div className="add-content-box">
        <h2>Add a New Student</h2>
        <form className="add-form-layout" onSubmit={handleSubmit}>
          <input
            type="text"
            name="registration"
            placeholder="Registration Number"
            value={formData.registration}
            onChange={handleChange}
            className="add-input-field"
          />
          <input
            type="text"
            name="student_name"
            placeholder="Student Name"
            value={formData.student_name}
            onChange={handleChange}
            className="add-input-field"
          />
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
            className="add-input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="add-input-field"
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="add-input-field"
          />
          <input
            type="text"
            name="hostel_number"
            placeholder="Hostel Number"
            value={formData.hostel_number}
            onChange={handleChange}
            className="add-input-field"
          />
          <input
            type="text"
            name="room_number"
            placeholder="Room Number"
            value={formData.room_number}
            onChange={handleChange}
            className="add-input-field"
          />
          <button type="submit" className="add-action-button" style={{ backgroundColor: buttonColor }}>
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;