import {
  EuiButtonIcon,
  EuiCommentList,
  EuiIcon,
  EuiText,
  commonDurationRanges,
  prettyDuration,
} from "@elastic/eui";
import React from "react";
import Rating from "./Rating";
import TimeFormatter from "./TimeFormatter";

export default function ElasticComment({ reviews }) {
  let currentTime = new Date().getTime() / 1000;
  const comments = [];

  reviews &&
    reviews.map((review) => {
      const rating = (
        <div className="tw-mb-0">
          <div className="tw-flex tw-py-3 tw-pb-6 tw-px-2 tw-flex-col tw-items-baseline">
            <div className="tw-text-md tw-pb-6  tw-items-center tw-flex">
              <img
                src="/images/shopping.svg"
                className="tw-opacity-25 tw-h-5 tw-w-5 tw-m-2 tw-rounded-full tw-shadow"
              />
              <div>
                <div className="tw-ml-4 ">
                  <div className=" tw-text-base tw-text-gray-900">
                    {review.name}
                  </div>

                  <span className="tw-text-xs tw-text-gray-900 tw-text-opacity-75 tw-tracking-wider tw-font-normal">
                    <TimeFormatter
                      previous={
                        Date.parse(review.createdAt.substring(0)) / 1000
                      }
                      current={currentTime}
                    />
                  </span>
                </div>
              </div>
            </div>
            <Rating value={review.rating} />
            <div className="tw-mt-2 tw-mb-1 tw-text-gray-900 tw-text-opacity-75  tw-text-base tw-font-medium tw-tracking-normal">
              {review.comment}
            </div>
          </div>
        </div>
      );
      comments.push({
        username: rating,
        timelineIcon: false,
        avatar: false,

        children: (
          <div className="tw-flex tw-items-center tw-py-2 tw-px-2 tw-text-gray-600">
            <div className="tw-items-center tw-flex">
              <svg
                class="tw-w-4 tw-h-4 tw-mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
              Helpful
            </div>

            <div className="tw-items-center tw-flex tw-mx-4">
              <svg
                class="tw-w-4 tw-h-4 tw-mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Report
            </div>
          </div>
        ),
      });
    });

  return (
    <>
      <EuiCommentList comments={comments} />
    </>
  );
}
