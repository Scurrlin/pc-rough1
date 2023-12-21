import React from 'react';
import { useRouter } from 'next/router';

interface Property {
  id: string;
  name: string;
  address: string;
  licenseNumber: string;
}

const properties: Property[] = [
];

const ResultsPage = () => {  
  const router = useRouter();
  const { licenseNumber } = router.query;

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