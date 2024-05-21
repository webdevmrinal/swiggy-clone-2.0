import React, { useEffect, useRef, useState } from "react";

function DishesCarousel({ data }) {
  // card.card.imageGridCards.info[0].action.link;

  // const imageArray = data?.card?.card?.imageGridCards?.info;
  const [imageArray, setImageArray] = useState([]);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  const handleSlider = (direction) => {
    const totalImagesWidth = imageRefs.current.reduce(
      (acc, img) => acc + img.offsetWidth,
      0
    );
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
  };

  console.log("carousel offset:", carouselOffset);

  useEffect(() => {
    setImageArray(data?.card?.card?.imageGridCards?.info);
  }, [data]);
  // console.log(imageArray);

  return (
    <div
      className="p-4 w-[1150px] h-64 mx-auto overflow-hidden"
      ref={containerRef}
    >
      <div className="flex justify-between">
        <div className="text-2xl font-bold">What's on your mind?</div>{" "}
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
      <div
        className="h-full w-full flex"
        style={{
          transform: `translateX(-${carouselOffset}px)`,
          transition: "transform .5s ease-in-out",
        }}
      >
        {imageArray.map((item, index) => {
          return (
            <img
              key={item?.imageId}
              className="h-4/5 w-44 mx-1 cursor-pointer"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`}
              alt=""
              ref={(el) => (imageRefs.current[index] = el)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DishesCarousel;
