import React from 'react';
import { useLocation } from 'react-router-dom';

interface Property {
  id: string;
  name: string;
  address: string;
}

const ResultsPage = () => {
  const location = useLocation();
  const properties: Property[] = location.state.properties;

  return (
    <div>
      {properties.map((property: Property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <p>{property.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;