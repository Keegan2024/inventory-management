import React, { useState } from 'react';
import axios from 'axios';

const ReportForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/reports',
        { title, content },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setMessage('Report submitted successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('Error submitting report');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Submit Report
