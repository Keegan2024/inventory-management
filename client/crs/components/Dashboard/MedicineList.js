import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/medicines', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setMedicines(res.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Medicine Inventory</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Facility</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.quantity}</td>
                <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                <td>{medicine.facility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineList;
