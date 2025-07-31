import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [facility, setFacility] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password, facility });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data.msg || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up for MediStock</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
          />
          <input
            type="text"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            placeholder="Facility Name"
            className="input"
          />
          <button onClick={handleSubmit} className="btn-primary">
            Sign Up
          </button>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-secondary hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
