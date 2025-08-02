import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');  // Changed from '/login' to '/'
  };

  return (
    <nav className="bg-primary text-white p-4 shadow-lg">
      <div className="container flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
          MediStock
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-accent transition duration-200">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="btn-primary bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
