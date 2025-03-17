import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import UploadResume from './pages/UploadResume';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import RateUs from './pages/RateUs';
import RecruiterDashboard from './pages/RecruiterDashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rate-us" element={<RateUs />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;