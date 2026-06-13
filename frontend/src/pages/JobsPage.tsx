import React from 'react';

const JobsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Recruitment Opportunities</h1>
      <div className="space-y-4">
        {/* Placeholder jobs */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Position {i}: Professional {i % 2 === 0 ? 'Football' : 'Basketball'} Player</h3>
            <p className="text-gray-600 mb-2">Team {i} is looking for talented athletes</p>
            <p className="text-sm text-gray-500 mb-4">Location: City {i} | Salary: $50k - $100k</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              View Details & Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
