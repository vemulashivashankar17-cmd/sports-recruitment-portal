import React from 'react';

const TeamsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Teams</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Placeholder teams */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Team {i}</h3>
            <p className="text-gray-600 mb-4">Professional sports team looking for talent</p>
            <p className="text-sm text-gray-500 mb-4">Sport: Football | Location: City {i}</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              View Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
