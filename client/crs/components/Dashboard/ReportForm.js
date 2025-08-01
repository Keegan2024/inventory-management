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
      <h2 className="text-2xl font-bold mb-4">Submit Report</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Report Title"
          className="input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Report Content"
          rows="6"
          className="input"
        ></textarea>
        <button onClick={handleSubmit} className="btn-primary">
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
