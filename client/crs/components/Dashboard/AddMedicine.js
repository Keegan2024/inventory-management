import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [facility, setFacility] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/medicines',
        { name, quantity, expiryDate, facility },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setMessage('Medicine added successfully');
      setName('');
      setQuantity('');
      setExpiryDate('');
      setFacility('');
    } catch (error) {
      setMessage('Error adding medicine');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Medicine</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Medicine Name"
          className="input"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="input"
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
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
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default AddMedicine;
