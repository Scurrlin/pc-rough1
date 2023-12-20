import React from 'react';

const SearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 text-gray-800">
      <h1 className="text-2xl mb-5">Enter your real estate license number for a portfolio sample</h1>
      <form className="flex flex-col items-center">
        <input type="text" name="licenseNumber" placeholder="Enter license number" className="px-4 py-2 mb-4 border border-gray-300 rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Search</button>
      </form>
    </div>
  );
};

export default SearchPage;
