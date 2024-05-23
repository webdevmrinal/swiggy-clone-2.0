import { useState, useEffect } from "react";
import { fetchRestaurants } from "./utils/getRestaurantData";
import Header from "./components/Header";
import DishesCarousel from "./components/DishesCarousel";
import RestaurantChains from "./components/RestaurantChains";
import SelectCity from "./components/SelectCity";
import InitialShimmer from "./components/InitialShimmer";
import RestaurantsList from "./components/RestaurantsList";
import BestRestaurants from "./components/BestRestaurants";
import TopLoadingBar from "./components/TopLoadingBar";

function App() {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [coord, setCoord] = useState({ lat: 17.3753, lng: 78.4744 });
  console.log(coord);

  useEffect(() => {
    const getData = async () => {
      setDataLoading(true);
      setLoadingProgress(0);
      const params = {
        lat: coord.lat,
        lng: coord.lng,
        "is-seo-homepage-enabled": true,
        page_type: "DESKTOP_WEB_LISTING",
      };
      const restaurantData = await fetchRestaurants(params);
      setData(restaurantData);
      setDataLoading(false);
    };

    getData();
  }, [coord?.lat, coord?.lng]);

  console.log(data);

  return (
    <div className="w-screen h-screen bg-white overflow-x-hidden">
      <div className="fixed top-0 z-50 w-full bg-white shadow-md">
        <Header />
      </div>
      {!data ? (
        <>
          <InitialShimmer />
        </>
      ) : (
        <div className="pt-20">
          <div className="w-full">
            {data && <DishesCarousel data={data?.data?.cards?.[0]} />}
          </div>
          <div className="w-full">
            {data && <RestaurantChains data={data?.data?.cards?.[1]} />}
          </div>
          <div className="w-full">
            <RestaurantsList
              headerData={data?.data?.cards?.[2]}
              data={data?.data?.cards?.[4]}
            />
          </div>
          <div className="w-full">
            <BestRestaurants data={data?.data.cards[6]} />
          </div>
          <SelectCity setCoord={setCoord} />
        </div>
      )}
    </div>
  );
}

export default App;
