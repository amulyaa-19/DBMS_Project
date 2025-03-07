import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Delete from "./pages/Delete";
import CustomQuery from "./pages/CustomQuery";
import Navbar from "./Navbar";
import "./App.css"; 



function App() {
  
  return (
    <BrowserRouter>
    
      <div className="app-container">
        <div className="main-content">
        <Navbar></Navbar>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<Add />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/custom-query" element={<CustomQuery />} />
            <Route path="*" element={<Home />} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;