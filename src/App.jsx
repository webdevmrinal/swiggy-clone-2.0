import { useState, useEffect } from "react";
import { fetchRestaurants } from "./utils/getRestaurantData";
import Header from "./components/Header";
import DishesCarousel from "./components/DishesCarousel";
import RestaurantChains from "./components/RestaurantChains";
import SelectCity from './components/SelectCity';

const cityCoordinates = {
  Delhi: { lat: 28.61, lng: 77.23 },
  Bengaluru: { lat: 12.972442, lng: 77.580643 },
  Chennai: { lat: 13.067439, lng: 80.237617 },
  Kolkata: { lat: 22.572645, lng: 88.363892 },
  Mumbai: { lat: 19.07609, lng: 72.877426 },
  Hyderabad: { lat: 17.38714, lng: 78.491684 },
  Pune: { lat: 18.516726, lng: 73.856255 },
  Ahmedabad: { lat: 23.033863, lng: 72.585022 },
  Jaipur: { lat: 26.92207, lng: 75.778885 },
  Lucknow: { lat: 26.884535, lng: 80.994736 },
};

function App() {
  const [data, setData] = useState(null);
  const [coord, setCoord] = useState({ lat: 28.61, lng: 77.23 })
  console.log(coord)

  const cityName = "Jaipur";
  const { lat, lng } = cityCoordinates[cityName] || cityCoordinates["Delhi"];

  useEffect(() => {
    const getData = async () => {
      const params = {
        lat:coord.lat,
        lng:coord.lng,
        "is-seo-homepage-enabled": true,
        page_type: "DESKTOP_WEB_LISTING",
      };
      const restaurantData = await fetchRestaurants(params);
      setData(restaurantData);
    };
    getData();
  }, [coord?.lat]);

  console.log(data);

  return (
    <div className="w-screen h-screen bg-white">
      <div className="w-full bg-white shadow-md">
        <Header />
      </div>
      <div className="w-full">
        {data && <DishesCarousel data={data?.data?.cards?.[0]} />}
      </div>
      <div className="w-full">
        {data && <RestaurantChains data={data?.data?.cards?.[1]} />}
      </div>
      <SelectCity setCoord={setCoord}/>
    </div>
  );
}

export default App;
