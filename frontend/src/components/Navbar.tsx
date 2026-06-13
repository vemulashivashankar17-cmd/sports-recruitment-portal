import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ⚽ Sports Recruitment
        </Link>
        <div className="flex gap-6">
          <Link to="/athletes" className="hover:text-blue-200">Athletes</Link>
          <Link to="/teams" className="hover:text-blue-200">Teams</Link>
          <Link to="/jobs" className="hover:text-blue-200">Opportunities</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
