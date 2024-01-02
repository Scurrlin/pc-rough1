import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as sql from 'mssql';
import '../app/globals.css';

const SearchPage = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const router = useRouter();

  // Replace with your actual database connection configuration
  const dbConfig: sql.config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database',
    options: {
      encrypt: true, // If using Azure
    },
  };

  // Replace with your actual API endpoint URL
  const apiEndpoint = 'YOUR_API_ENDPOINT';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await fetchData(licenseNumber);

      if (data) {
        console.log('Data retrieved:', data);
        // Handle the retrieved data as needed
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchData = async (uniqueIdentifier: string) => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          unique_identifier: uniqueIdentifier,
          // Include any other necessary parameters (e.g., API key) here
        },
      });

      if (response.status === 200) {
        const data = response.data;
        await saveDataToDatabase(data);
        return data;
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        return null;
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
  };

  const saveDataToDatabase = async (data: any) => {
    try {
      // Connect to the database
      await sql.connect(dbConfig);

      // Execute a SQL query to insert data into the database
      const query = `
          INSERT INTO YourTableName (
              UniqueIdentifier,
              Field1,
              Field2,
              Field3,
              Field4,
              AdditionalField1,
              AdditionalField2
          )
          VALUES (
              '${data.uniqueIdentifier}',
              '${data.field1}',
              '${data.field2}',
              '${data.field3}',
              '${data.field4}',
              '${data.additionalField1}',
              '${data.additionalField2}'
          )
      `;

      await sql.query(query);

      // Close the database connection
      await sql.close();
    } catch (error) {
      console.error(`Error saving data to database: ${error.message}`);
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