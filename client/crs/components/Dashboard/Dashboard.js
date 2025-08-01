import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MedicineList from './MedicineList';
import AddMedicine from './AddMedicine';
import ReportForm from './ReportForm';
import ReportReview from './ReportReview';

const Dashboard = ({ user }) => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8 text-accent">MediStock Dashboard</h1>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/dashboard/medicines" className="btn-primary">
          View Medicines
        </Link>
        {user?.role === 'admin' && (
          <Link to="/dashboard/add-medicine" className="btn-primary">
            Add Medicine
          </Link>
        )}
        <Link to="/dashboard/report" className="btn-primary">
          Submit Report
        </Link>
        {user?.role === 'admin' && (
          <Link to="/dashboard/review-reports" className="btn-primary">
            Review Reports
          </Link>
        )}
      </div>
      <div className="card">
        <Routes>
          <Route path="/medicines" element={<MedicineList />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/review-reports" element={<ReportReview />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
