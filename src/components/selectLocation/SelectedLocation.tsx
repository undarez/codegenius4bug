import React, { useState, useEffect } from 'react';
import './selectionLocation.scss';

export interface CR1Placement {
      Id: number;
      name: string;
}

const SelectedLocation = ({
      data,
      update,
}: {
      data: CR1Placement[];
      update: any;
}) => {
      const [selectedLocation, setSelectedLocation] = useState<CR1Placement>();
      

      const handleLocationSelection = (
            event: React.ChangeEvent<HTMLSelectElement>
      ) => {
            const selectedId = parseInt(event.target.value);
            const location = data.find(
                  (location) => location.Id === selectedId
            );
            const selectedValue = location ? location : undefined;
            setSelectedLocation(selectedValue);
      };

      // On remonte la valeur de l'emplacement sélectionné au composant parent
      useEffect(() => {
            update(selectedLocation);
      }, [selectedLocation]);

      return (
            <div className='container-location'>
                  <h1>Sélection d'un emplacement</h1>
                  <p>cela est optionnel vous avez la possibilité entre choisir un emplacement ou de créer votre propre QR-code/code-barre a vous de choisir</p>
                  <select
                        value={selectedLocation?.Id}
                        onChange={handleLocationSelection}
                  >
                        <option value="">Sélectionnez un emplacement</option>
                        {data.map((location: CR1Placement) => (
                              <option key={location.Id} value={location.Id}>
                                    {location.name}
                              </option>
                        ))}
                  </select>
                  {selectedLocation && (
                        <div>
                              <h2>Emplacement sélectionné :</h2>
                        </div>
                  )}
            </div>
      );
};

export default SelectedLocation;