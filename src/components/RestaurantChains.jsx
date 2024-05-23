import React, { useRef, useState } from "react";

function RestaurantChains({ data }) {
  console.log(data);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [slidePercentage, setSlidePercentage] = useState(0);
  const containerRef = useRef(null);

  const mapPercentage = (percentage) => {
    const maxWidth = 100 - 12; // Maximum width minus 12px
    return (percentage / 100) * maxWidth;
  };

  const handleSlider = (direction) => {
    const totalImagesWidth =
      320 * data?.card?.card?.gridElements?.infoWithStyle?.restaurants.length;
    // const totalImagesWidth = imageRefs.current.reduce(
    //   (acc, img) => acc + img.offsetWidth,
    //   0
    // );
    const containerWidth = containerRef.current.offsetWidth;

    if (direction === "right") {
      const maxOffset = totalImagesWidth - containerWidth;
      const nextOffset = carouselOffset + 630;

      if (nextOffset >= maxOffset) {
        setCarouselOffset(maxOffset);
        setIsRightDisabled(true);
        setIsLeftDisabled(false);
      } else {
        setCarouselOffset(nextOffset);
        setIsRightDisabled(false);
        setIsLeftDisabled(false);
      }
    } else if (direction === "left") {
      const nextOffset = carouselOffset - 630;

      if (nextOffset <= 0) {
        setCarouselOffset(0);
        setIsLeftDisabled(true);
        setIsRightDisabled(false);
      } else {
        setCarouselOffset(nextOffset);
        setIsLeftDisabled(false);
        setIsRightDisabled(false);
      }
    }
    const totalSlides = Math.ceil(totalImagesWidth / containerWidth);
    const currentSlide = Math.floor(carouselOffset / containerWidth);
    const slidePercentage = (currentSlide / (totalSlides - 1)) * 100;

    const mappedSlidePercentage = mapPercentage(slidePercentage);
    // console.log(slidePercentage);
    setSlidePercentage(mappedSlidePercentage);
  };

  return (
    <div className="w-[1350px] mx-auto px-4 pb-12">
      <div className="flex justify-between pt-10  border-t-2">
        <div className="font-bold text-2xl">
          {data?.card?.card?.header?.title}
        </div>
        <div className="space-x-3">
          <button
            className="inline-block h-8 w-8 relative rounded-full bg-gray-300"
            onClick={() => handleSlider("left")}
            style={{ opacity: isLeftDisabled ? "0.5" : "1" }}
          >
            <svg
              fill="#000000"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              id="left"
              data-name="Flat Color"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-color absolute left-0 top-0 translate-y-2/4 translate-x-2/4"
            >
              <path
                id="primary"
                d="M21,11H5.41l5.3-5.29A1,1,0,1,0,9.29,4.29l-7,7a1,1,0,0,0,0,1.42l7,7a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z"
                style={{ fill: "rgb(0, 0, 0)" }}
              />
            </svg>
          </button>
          <button
            className="inline-block h-8 w-8 relative rounded-full bg-gray-300"
            onClick={() => handleSlider("right")}
            style={{ opacity: isRightDisabled ? "0.5" : "1" }}
          >
            <svg
              fill="#000000"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              id="right"
              data-name="Flat Color"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-color absolute left-0 top-0 translate-y-2/4 translate-x-2/4"
            >
              <path
                id="primary"
                d="M21.71,11.29l-7-7a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l7-7A1,1,0,0,0,21.71,11.29Z"
                style={{ fill: "rgb(0, 0, 0)" }}
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-4 w-full overflow-hidden" ref={containerRef}>
        <div
          className="flex"
          style={{
            transform: `translateX(-${carouselOffset}px)`,
            transition: "transform .5s ease-in-out",
          }}
        >
          {data &&
            data?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
              (restaurant) => {
                return (
                  <RestaurantCard data={restaurant} key={restaurant.info.id} />
                );
              }
            )}
        </div>
      </div>
      <div
        className="rest-chain-slider-indicator"
        style={{ "--slidePercentage": `${slidePercentage}%` }}
      />
    </div>
  );
}

const RestaurantCard = ({ data }) => {
  if (!data) return;
  return (
    <div className=" py-6 inline-block cursor-pointer hover:scale-95 transition-all">
      <div className="w-80">
        <div
          className="w-72 h-48 rounded-xl bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url(https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${data.info.cloudinaryImageId})`,
          }}
        >
          <div
            className="w-full font-extrabold uppercase text-2xl text-white absolute bottom-0"
            style={{
              background:
                "linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)",
            }}
          >
            <div className="p-3 pb-1 min-h-8">
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
        </div>
        <div className="font-semibold text-lg pl-3 pr-5 pt-2 text-ellipsis whitespace-nowrap overflow-hidden w-full">
          {data.info.name}
        </div>
        <div className="font-semibold flex gap-1 pl-3 pr-5">
          <span className="flex items-center justify-center space-x-1">
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
            <span>{data.info.avgRating}</span>
          </span>
          <span> • </span>
          <span>{data.info.sla.slaString}</span>
        </div>
        <div className="font-light pl-3 pr-5 text-ellipsis whitespace-nowrap overflow-hidden w-full">
          {data.info.cuisines.map((cuisine, index) => {
            if (index === data.info.cuisines.length - 1) return cuisine + "";
            else return cuisine + ", ";
          })}
        </div>
        <div className="font-light pl-3 pr-5">{data.info.areaName}</div>
      </div>
    </div>
  );
};
export default RestaurantChains;
