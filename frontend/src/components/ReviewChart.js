import React from "react";
import Rating from "../components/Rating";

export default function ReviewChart({ product }) {
  let ratingList = [];

  const ratings = product && product.reviews;

  if (ratings) {
    ratingList = ratings.map((review) => review.rating);
  }

  const valueCounts =
    ratingList &&
    ratingList.reduce((counts, value) => {
      const valueCount = counts[value] === undefined ? 0 : counts[value];

      return { ...counts, ...{ [value]: valueCount + 1 } };
    }, {});

  console.log(valueCounts);
  return (
    <>
      <div class="  tw-my-8 tw-py-4 tw-px-4 ">
        <div class="tw-mb-1 tw-flex tw-tracking-wide tw-py-4">
          <div className="tw-items-center tw-justify-center tw-flex">
            <svg
              ariaHidden="true"
              // width="120"
              // height="120"
              viewBox="0 0 120 120"
              className="tw-relative tw-w-24 tw-h-24 sm:tw-w-32 sm:tw-h-32 sm:tw-p-1"
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
          <div class="tw-border-b tw-w-full tw-ml-2 tw--mx-8 tw-px-3 tw-pb-3">
            <div class="tw-flex tw-items-center tw-mt-2">
              <div class="  tw-text-teal-700  tw-font-medium tw-opacity-75 tw-tracking-tighter">
                <span className="tw-whitespace-no-wrap tw-text-sm tw-mr-4 ">
                  5 stars
                </span>
              </div>
              <div class="tw-w-full">
                <div class="tw-bg-gray-300 tw-w-full tw-rounded-lg tw-h-3">
                  <div
                    style={{
                      width:
                        ((valueCounts[5] || 0) / ratingList.length) * 100 + "%",
                    }}
                    class="tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"
                  ></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">{valueCounts[5] || 0}</span>
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
                  <div
                    style={{
                      width:
                        ((valueCounts[4] || 0) / ratingList.length) * 100 + "%",
                    }}
                    class=" tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"
                  ></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">{valueCounts[4] || 0}</span>
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
                  <div
                    style={{
                      width:
                        ((valueCounts[3] || 0) / ratingList.length) * 100 + "%",
                    }}
                    class="  tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"
                  ></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">{valueCounts[3] || 0}</span>
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
                  <div
                    style={{
                      width:
                        ((valueCounts[2] || 0) / ratingList.length) * 100 + "%",
                    }}
                    class="  tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"
                  ></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">{valueCounts[2] || 0}</span>
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
                  <div
                    style={{
                      width:
                        ((valueCounts[1] || 0) / ratingList.length) * 100 + "%",
                    }}
                    class="  tw-bg-green-500 tw-opacity-75 tw-rounded-lg tw-h-3"
                  ></div>
                </div>
              </div>
              <div class=" tw-text-gray-800 ">
                <span class="tw-text-sm tw-px-3">{valueCounts[1] || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
