import React, { useEffect, useState } from "react";
import cityData from "../assets/in.json";

const SelectCity = ({ setCoord }) => {
  const [cities, setCities] = useState(null);
  const [selectedCity, setSetselectedCity] = useState(null);

  useEffect(() => {
    setCities(cityData);
  }, []);

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    const selectedCityData = cities.find(
      (city) => city.city === selectedCityName
    );
    setSetselectedCity(selectedCityData);
    if (selectedCityData) {
      setCoord({ lat: selectedCityData.lat, lng: selectedCityData.lng });
    }
  };

  return (
    <div className="absolute top-6 z-[51] left-4">
      <select onChange={handleCityChange}>
        <option value="">-- Select City --</option>
        {cities &&
          cities?.map((city) => (
            <option key={city.city} value={city.city}>
              {city.city}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectCity;
