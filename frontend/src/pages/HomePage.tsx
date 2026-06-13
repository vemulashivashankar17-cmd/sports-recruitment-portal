import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Sports Recruitment Portal</h1>
        <p className="text-xl mb-8">Connect talented athletes with coaching opportunities worldwide</p>
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">🏃 Athletes</h3>
            <p>Showcase your skills and find the perfect opportunity to grow</p>
          </div>
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">👥 Teams</h3>
            <p>Discover talented athletes and build your winning team</p>
          </div>
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">📋 Opportunities</h3>
            <p>Browse exciting positions and recruitment opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
