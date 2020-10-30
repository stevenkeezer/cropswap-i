import React from "react";

export default function CategorySlider({ history }) {
  return (
    <div
      style={{ color: "rgb(74, 74, 74) !important", paddingBottom: "1px" }}
      className=" tw-text-xs category-slider  tw-px-2  tw-pt-1 tw-items-center tw-overflow-x-scroll tw-font-semibold tw-flex tw-tracking-wider  tw-mt-4 tw-mb-1 tw-text-gray-800 tw-antialiased tw-leading-wide"
    >
      <div
        onClick={(e) => history.push("/search/seasonal")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Seasonal
      </div>

      <div
        onClick={(e) => history.push("/search/tomatoes")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Tomatoes
      </div>
      <div
        onClick={(e) => history.push("/search/apple")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Apples
      </div>
      <div
        onClick={(e) => history.push("/search/radishe")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Radishes
      </div>
      <div
        onClick={(e) => history.push("/search/soil")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Soil
      </div>
      <div
        onClick={(e) => history.push("/search/squash")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Lettuce
      </div>
      <div
        onClick={(e) => history.push("/search/squash")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Squash
      </div>
      <div
        onClick={(e) => history.push("/search/squash")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Deliveries
      </div>
      <div
        onClick={(e) => history.push("/search/compost")}
        className="hover:tw-text-teal-700 tw-px-2 tw-cursor-pointer"
      >
        Compost
      </div>
    </div>
  );
}
