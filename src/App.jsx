import { useState, useEffect } from "react";
import { fetchRestaurants } from "./utils/getRestaurantData";
import Header from "./components/Header";
import DishesCarousel from "./components/DishesCarousel";
import RestaurantChains from "./components/RestaurantChains";
import SelectCity from "./components/SelectCity";
import InitialShimmer from "./components/InitialShimmer";

function App() {
  const [data, setData] = useState(null);
  const [coord, setCoord] = useState({ lat: 28.61, lng: 77.23 });
  console.log(coord);

  useEffect(() => {
    const getData = async () => {
      const params = {
        lat: coord.lat,
        lng: coord.lng,
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
      {!data ? (
        <InitialShimmer />
      ) : (
        <>
          <div className="w-full">
            {data && <DishesCarousel data={data?.data?.cards?.[0]} />}
          </div>
          <div className="w-full">
            {data && <RestaurantChains data={data?.data?.cards?.[1]} />}
          </div>
          <SelectCity setCoord={setCoord} />
        </>
      )}
    </div>
  );
}

export default App;
