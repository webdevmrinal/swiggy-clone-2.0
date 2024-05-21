import React from "react";

function RestaurantChains({ data }) {
  return (
    <div className="w-[1150px] mx-auto p-4">
      <div className="font-bold text-2xl">
        {data?.card?.card?.header?.title}
      </div>
    </div>
  );
}

export default RestaurantChains;
