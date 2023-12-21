import React from 'react';
import { useLocation } from 'react-router-dom';

interface Property {
  id: string;
  name: string;
  address: string;
  licenseNumber: string;
}

const properties: Property[] = [
];

const ResultsPage = () => {  
  const location = useLocation();
  const licenseNumber = location.state.licenseNumber;

  const filteredProperties = properties.filter(property => property.licenseNumber === licenseNumber);

  return (
    <div>
      {filteredProperties.map((property: Property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <p>{property.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;