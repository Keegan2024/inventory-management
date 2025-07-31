import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data.msg || 'Request failed');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
        {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="input"
          />
          <button onClick={handleSubmit} className="btn-primary">
            Send Reset Link
          </button>
          <p className="text-center text-sm">
            <a href="/login" className="text-secondary hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
