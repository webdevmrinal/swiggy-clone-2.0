import React, { useState } from "react";

const BestRestaurants = ({ data }) => {
  console.log("bestRestaurants", data);
  const [showAll, setShowAll] = useState(false);

  const handleShowMoreClick = () => {
    setShowAll(true);
  };

  const renderBrands = () => {
    if (!data?.card?.card?.brands) return null;

    return data.card.card.brands?.map((city, index) => {
      if (!showAll && index >= 11) {
        if (index === 11) {
          return (
            <div
              key="show-more"
              className="border rounded-xl px-7 py-4 font-semibold text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer"
              onClick={handleShowMoreClick}
            >
              Show More &or;
            </div>
          );
        }
        return null;
      }

      return (
        <div
          key={city?.text}
          className="border rounded-xl px-7 py-4 text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer"
        >
          {city?.text}
        </div>
      );
    });
  };

  return (
    <div className="w-[1350px] mx-auto px-4 py-4">
      <div className="font-bold text-2xl py-4">
        Best Places to Eat Across Cities
      </div>
      <div className="grid grid-cols-4 gap-8 text-center">{renderBrands()}</div>
    </div>
  );
};

export default BestRestaurants;
