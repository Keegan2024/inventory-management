import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard/Dashboard';
import ResetPassword from './components/Auth/ResetPassword';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode JWT to get user info properly
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ token, role: payload.role, facility: payload.facility });
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div className="App">
      {user && <Navbar setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
