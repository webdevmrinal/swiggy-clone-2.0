import React from "react";

const TopLoadingBar = () => {
  return (
    <div className="absolute w-screen h-[100px] top-0 z-[1000]">
      <div className="w-full bg-orange-500 rounded-full" />
    </div>
  );
};

export default TopLoadingBar;
