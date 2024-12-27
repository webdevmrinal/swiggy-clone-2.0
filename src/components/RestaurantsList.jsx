import React from "react";

const RestaurantsList = ({ data, headerData }) => {
  console.log("restList data:", data);
  return (
    <div className="w-[1350px] mx-auto px-4">
      <div className="font-bold text-2xl border-t-2 pt-8">
        {headerData?.card?.card?.title}
      </div>
      <div className="py-4 flex gap-4 text-sm font-semibold text-gray-600">
        <div className="filter-buttons flex items-center gap-2">
          <span>Filter</span>
          <svg
            aria-hidden="true"
            height={16}
            width={16}
            className="sc-dhKdcB bmyDnM"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.4 5.999a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm1.6 0a2.8 2.8 0 0 1-5.485.8H1.81a.8.8 0 1 1 0-1.6h7.707a2.801 2.801 0 0 1 5.484.8ZM3.8 13.453a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm0 1.6a2.8 2.8 0 1 1 2.684-3.6h7.711a.8.8 0 1 1 0 1.6h-7.71a2.801 2.801 0 0 1-2.685 2Z"
              fill="var(--fill-color)"
              fillOpacity=".92"
            ></path>
          </svg>
        </div>
        <div className="filter-buttons flex items-center gap-2">
          <span>Sort By</span>{" "}
          <svg
            aria-hidden="true"
            height={12}
            width={12}
            className="sc-dhKdcB bMdcuJ"
            style={{ fillOpacity: 1 }}
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.309 4.277a.9.9 0 0 0-.096 1.27l3.362 3.91c.01.01.019.02.028.032.151.176.32.373.486.519.195.17.501.377.927.377.426 0 .732-.206.927-.377.165-.146.335-.343.486-.52l.028-.031 3.33-3.873a.9.9 0 1 0-1.365-1.173l-3.33 3.872-.076.088-.076-.088-3.362-3.91a.9.9 0 0 0-1.27-.096Z"
              fill="var(--fill-color)"
              fillOpacity=".92"
            ></path>
          </svg>
        </div>
        <div className="filter-buttons">Fast Delivery</div>
        <div className="filter-buttons">New on Swiggy</div>
        <div className="filter-buttons">Ratings 4.0+</div>
        <div className="filter-buttons">Pure Veg</div>
        <div className="filter-buttons">Offers</div>
        <div className="filter-buttons">Rs. 300-Rs. 600</div>
        <div className="filter-buttons">Less than 300</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
          (restaurant) => {
            return (
              <RestaurantCard data={restaurant} key={restaurant.info.id} />
            );
          }
        )}
      </div>
    </div>
  );
};

const RestaurantCard = ({ data }) => {
  return (
    <div className="hover:scale-95 transition-all cursor-pointer">
      <div
        className="w-80 h-52 rounded-xl bg-cover bg-center overflow-hidden relative"
        style={{
          backgroundImage: `url(https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${data?.info?.cloudinaryImageId})`,
        }}
      >
        <div
          className="w-full font-extrabold uppercase text-2xl text-white absolute bottom-0 p-3 pb-1 min-h-8"
          style={{
            background:
              "linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)",
          }}
        >
          {data?.info?.aggregatedDiscountInfoV3?.header &&
            data?.info?.aggregatedDiscountInfoV3?.subHeader && (
              <>
                {data?.info?.aggregatedDiscountInfoV3?.header +
                  " " +
                  data?.info?.aggregatedDiscountInfoV3?.subHeader}
              </>
            )}
        </div>
      </div>
      <div className="font-semibold text-lg pl-3 pr-5 pt-2 text-ellipsis whitespace-nowrap overflow-hidden w-full">
        {data?.info?.name}
      </div>
      <div className="font-semibold flex gap-1 pl-3 pr-5">
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          role="img"
          aria-hidden="true"
          strokecolor="rgba(2, 6, 12, 0.92)"
          fillcolor="rgba(2, 6, 12, 0.92)"
        >
          <circle
            cx={10}
            cy={10}
            r={9}
            fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
          />
          <path
            d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="StoreRating20_svg__paint0_linear_32982_71567"
              x1={10}
              y1={1}
              x2={10}
              y2={19}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21973B" />
              <stop offset={1} stopColor="#128540" />
            </linearGradient>
          </defs>
        </svg>
        <div>{data?.info?.avgRatingString}</div>
        <div> • </div>
        <div>{data?.info?.sla?.slaString}</div>
      </div>
      <div className="font-light pl-3 pr-5 text-ellipsis whitespace-nowrap overflow-hidden w-full">
        {data?.info?.cuisines?.map((item, index) => {
          if (index === data?.info?.cuisines.length - 1) return item;
          else return item + ", ";
        })}
      </div>
      <div className="font-light pl-3 pr-5">{data?.info?.areaName}</div>
    </div>
  );
};

export default RestaurantsList;
