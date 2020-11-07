import React from "react";
import Rating from "../components/Rating";

export default function ReviewChart({ product }) {
  console.log(product);
  return (
    <>
      <div class="  tw-my-8  tw-px-0 tw-py-4 tw-px-4 sm:tw-px-0  ">
        <h2 class="tw-text-gray-900 tw-font-semibold tw-pb-5 tw-mt-2">
          Reviews
        </h2>
        <div class="tw-mb-1 tw-flex tw-tracking-wide tw-py-4">
          <div className="tw-items-center tw-justify-center tw-flex">
            <svg
              ariaHidden="true"
              width="120"
              height="120"
              viewBox="0 0 120 120"
              class="tw-relative"
            >
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="transparent"
                stroke="#E6E6E6"
                strokeWidth="8"
              ></circle>
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="transparent"
                stroke="#F5AB24"
                strokeWidth="8"
                dataTestid="review-circle-svg"
                offset="0"
                strokeDasharray="351.85837720205683"
                strokeLinecap="round"
                transform="rotate(-90, 60, 60)"
                class="styled-components__ReviewCircle-sc-1v6pp5r-4 bTRaoD loaded"
              ></circle>
            </svg>
            <div className="tw-absolute">
              <span className=" tw-text-3xl">{product && product.rating}</span>
              {/* <Rating value={product && product.rating} /> */}
            </div>
          </div>
          <div class="tw-border-b tw-w-full tw-ml-2 tw--mx-8 tw-px-8 tw-pb-3">
            <div class="tw-flex tw-items-center tw-mt-2">
              <div class="  tw-text-teal-700  tw-font-medium tw-opacity-75 tw-tracking-tighter">
                <span className="tw-whitespace-no-wrap tw-text-sm tw-mr-4 ">
                  5 stars
                </span>
              </div>
              <div class="tw-w-full">
                <div class="tw-bg-gray-300 tw-w-full tw-rounded-lg tw-h-3">
                  <div class=" tw-w-7/12 tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">25</span>
              </div>
            </div>

            <div class="tw-flex tw-items-center tw-mt-2">
              <div class=" tw-text-green-500 tw-opacity-75 tw-tracking-tighter">
                <span className="tw-whitespace-no-wrap tw-text-sm tw-mr-4 tw-text-gray-800">
                  4 stars
                </span>
              </div>
              <div class="tw-w-full">
                <div class="tw-bg-gray-300 tw-w-full tw-rounded-lg tw-h-3">
                  <div class="w-1/5 bg-green-500 tw-opacity-75 rounded-lg h-2"></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">1</span>
              </div>
            </div>

            <div class="tw-flex tw-items-center tw-mt-2">
              <div class=" tw-text-green-500 tw-opacity-75 tw-tracking-tighter">
                <span className="tw-whitespace-no-wrap tw-text-sm tw-mr-4 tw-text-gray-800">
                  3 stars
                </span>
              </div>
              <div class="tw-w-full">
                <div class="tw-bg-gray-300 tw-w-full tw-rounded-lg tw-h-3">
                  <div class=" tw-w-3/12 tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">0</span>
              </div>
            </div>

            <div class="tw-flex tw-items-center tw-mt-2">
              <div class="  tw-text-green-500 tw-opacity-75 tw-tracking-tighter">
                <span className="tw-whitespace-no-wrap tw-text-sm tw-mr-4 tw-text-gray-800">
                  2 stars
                </span>
              </div>
              <div class="tw-w-full">
                <div class="tw-bg-gray-300 tw-w-full tw-rounded-lg tw-h-3">
                  <div class="  tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">0</span>
              </div>
            </div>

            <div class="tw-flex tw-items-center tw-mt-2">
              <div class=" tw-text-green-500 tw-opacity-75 tw-tracking-tighter">
                <span className="tw-whitespace-no-wrap tw-text-sm tw-mr-4 tw-text-gray-800">
                  1 stars
                </span>
              </div>
              <div class="tw-w-full">
                <div class="tw-bg-gray-300 tw-w-full tw-rounded-lg tw-h-3">
                  <div class=" tw-w-2/12 tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
