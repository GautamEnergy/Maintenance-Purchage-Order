import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login"
import Navbar from "./Components/Navbar/Navbar";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nav" element={<Navbar />} />

        {/* <Route path="/about" element={<about />} /> */}
      </Routes>
    </Router>
  );
}


export default App; 
