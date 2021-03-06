import React from "react";
import { EuiSpacer } from "@elastic/eui";

export default function CategorySlider({ history }) {
  return (
    <div
      style={{ color: "rgb(74, 74, 74) !important", paddingBottom: "1px" }}
      className=" tw-text-sm category-slider tw-pl-2 tw-my-2 tw-h-6 tw-items-center tw-overflow-x-scroll tw-font-semibold tw-flex tw-tracking-wider tw-text-gray-900 tw-text-opacity-75 tw-antialiased tw-leading-wide"
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
