import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import EnrollForm from "./EnrollForm";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/course")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setCourses(res.data);
      });
  }, []);

  return (
    <Router>
      <div>
        <ToastContainer autoClose={4000} />
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/enroll" element={<EnrollForm courses={courses} />} />
            <Route path="/" element={<Home courses={courses} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
