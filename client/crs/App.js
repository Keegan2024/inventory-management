import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard/Dashboard';
import MedicineList from './components/Dashboard/MedicineList';
import AddMedicine from './components/Dashboard/AddMedicine';
import ReportForm from './components/Dashboard/ReportForm';
import ReportReview from './components/Dashboard/ReportReview';
import ResetPassword from './components/Auth/ResetPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="medicines" element={<MedicineList />} />
          <Route path="add-medicine" element={<AddMedicine />} />
          <Route path="report" element={<ReportForm />} />
          <Route path="review-reports" element={<ReportReview />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
