import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const properties = location.state.properties;

  return (
    <div>
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <p>{property.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;