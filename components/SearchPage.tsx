"use client"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const appClientId = process.env.NEXT_PUBLIC_APP_CLIENT_ID;
    const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

    if (!appClientId) {
      throw new Error('APP_CLIENT_ID is not defined');
    }

    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY is not defined');
    }

    const url = 'https://mls-router1.p.rapidapi.com/cognito-oauth2/token';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        app_client_id: appClientId
      })
    };

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('An error occurred while parsing the JSON:', error);
        return;
      }

      setProperties(data.properties);
      navigate('/results', { state: { licenseNumber } });
    } catch (error) {
      console.error('An error occurred while fetching the properties:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 text-gray-800">
      <h1 className="text-2xl mb-5">Portfolio Preview</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input type="text" name="licenseNumber" placeholder="Enter license number" className="px-4 py-2 mb-4 border border-gray-300 rounded" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default SearchPage;