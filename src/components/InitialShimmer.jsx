import React from "react";

const InitialShimmer = () => {
  return (
    <div className="h-[340px] mt-20 bg-[#171a29] text-slate-300 font-normal flex items-center justify-center flex-col gap-6">
      <div className="relative w-fit">
        <div className="shimmer-spinner"></div>
        <img
          className="absolute left-2/4 top-2/4 h-10 w-10 -translate-x-2/4 -translate-y-2/4"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
          alt=""
        />
      </div>
      <div className="text-3xl">Looking for great food near you...</div>
    </div>
  );
};

export default InitialShimmer;
