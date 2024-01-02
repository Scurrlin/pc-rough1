import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const router = useRouter();

  const fetchData = async (uniqueIdentifier: string) => {
    try {
      const response = await axios.get(`YOUR_API_ENDPOINT?uniqueIdentifier=${uniqueIdentifier}`);
      const data = response.data;
      console.log('Data retrieved from fetchData:', data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/properties?licenseNumber=${licenseNumber}`);
      const data = response.data;

      if (data) {
        console.log('Data retrieved:', data);
        // Navigate to the results page with the license number as a query parameter
        router.push(`/results?licenseNumber=${licenseNumber}`);
      }

      // Call fetchData after navigating to the results page
      fetchData(licenseNumber);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 text-gray-800">
      <h1 className="text-2xl mb-5">Portfolio Preview</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="licenseNumber"
          placeholder="Enter license number"
          className="px-4 py-2 mb-4 border border-gray-300 rounded"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchPage;