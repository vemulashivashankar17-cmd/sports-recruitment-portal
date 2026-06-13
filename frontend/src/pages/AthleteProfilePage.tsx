import React from 'react';

const AthleteProfilePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Athletes</h1>
      <div className="grid grid-cols-3 gap-6">
        {/* Placeholder athletes */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Athlete {i}</h3>
            <p className="text-gray-600 mb-4">Professional athlete specializing in football</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AthleteProfilePage;
