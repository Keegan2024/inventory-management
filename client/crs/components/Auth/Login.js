import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, 
        { email, password }
      );
      
      localStorage.setItem('token', res.data.token);
      
      // Decode JWT to get user info
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      setUser({ token: res.data.token, role: payload.role, facility: payload.facility });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login to MediStock</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
            required
          />
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-sm">
            <Link to="/forgot-password" className="text-secondary hover:underline">
              Forgot Password?
            </Link>
          </p>
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-secondary hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
