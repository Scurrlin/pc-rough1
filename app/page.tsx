'use client'

import React, { useState } from 'react';

const SearchPage = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [properties, setProperties] = useState([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://your-api-url/properties?licenseNumber=${licenseNumber}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProperties(data.properties);
    } catch (error) {
      console.error('An error occurred while fetching the properties:', error);
      // Here you could also update your state to show an error message in your UI
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 text-gray-800">
      <h1 className="text-2xl mb-5">Enter your real estate license number for a portfolio sample</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input type="text" name="licenseNumber" placeholder="Enter license number" className="px-4 py-2 mb-4 border border-gray-300 rounded" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Search</button>
      </form>
    </div>
  );
};

export default SearchPage;
