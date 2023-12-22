import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Property {
  id: string;
  name: string;
  address: string;
  licenseNumber: string;
}

const ResultsPage = () => {  
  const router = useRouter();
  const { licenseNumber } = router.query;

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (licenseNumber) {
      // Replace '/api/properties' with your actual API endpoint
      fetch(`/api/properties?licenseNumber=${licenseNumber}`)
        .then(response => response.json())
        .then(data => setProperties(data))
        .catch(error => console.error(error));
    }
  }, [licenseNumber]);

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