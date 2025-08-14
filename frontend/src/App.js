import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import Login from './pages/login';
import Signup from './pages/signup';
import LandingPage from './pages/landingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
