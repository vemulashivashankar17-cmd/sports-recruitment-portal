import React from 'react';
import { useAuthContext } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.firstName || user?.email}!</h2>
        <p className="text-gray-600">User Type: {user?.userType}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">📋 Applications</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <p className="text-gray-600">Pending review</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">💬 Messages</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-gray-600">Unread messages</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">⭐ Profile</h3>
          <p className="text-3xl font-bold text-purple-600">85%</p>
          <p className="text-gray-600">Profile completion</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
