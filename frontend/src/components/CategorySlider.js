import React from "react";

export default function CategorySlider() {
  return (
    <div
      style={{ color: "rgb(74, 74, 74) !important", paddingBottom: "1px" }}
      className=" tw-text-xs category-slider  tw-px-4   tw-items-center tw-overflow-x-scroll  tw-flex tw-tracking-wide  tw-mt-6 tw-pt-1"
    >
      <div
        // onClick={(e) => searchHandler("seasonal")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Seasonal
      </div>

      <div
        // onClick={(e) => searchHandler("tomatoes")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Tomatoes
      </div>
      <div
        // onClick={(e) => searchHandler("vegetables")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Vegetables
      </div>
      <div
        // onClick={(e) => searchHandler("fruits")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Fruits
      </div>
      <div
        // onClick={(e) => searchHandler("soil")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Soil
      </div>
      <div
        // onClick={(e) => searchHandler("squash")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Squash
      </div>
      <div
        // onClick={(e) => searchHandler("squash")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Squash
      </div>
      <div
        // onClick={(e) => searchHandler("squash")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Deliveries
      </div>
      <div
        // onClick={(e) => searchHandler("compost")}
        className="hover:tw-text-teal-700 tw-px-2 tw-font-semibold tw-text-gray-700 tw-cursor-pointer"
      >
        Compost
      </div>
    </div>
  );
}
