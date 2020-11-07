import {
  EuiButtonIcon,
  EuiCommentList,
  EuiCommentProps,
  EuiText,
} from "@elastic/eui";
import React from "react";
import Rating from "./Rating";

const body = (
  <EuiText size="s">
    <Rating />
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="subdued"
    iconType="copy"
  />
);

export default function ElasticComment({ reviews }) {
  const comments = [];

  reviews &&
    reviews.map((review) => {
      const rating = (
        <EuiText size="s">
          <div className="tw-flex tw-flex-col tw-items-baseline tw-gap-2">
            <div className="tw-text-md">{review.name}</div>
            <div>{review.comment}</div>
            <Rating value={review.rating} />
          </div>
        </EuiText>
      );
      comments.push({
        username: rating,
        timelineIcon: false,
        avatar: false,

        // timestamp: review.createdAt.substring(0),
        children: (
          <div className="tw-flex tw-items-center tw-text-gray-600">
            <svg
              class="tw-w-4 tw-h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
            </svg>
            Helpful
          </div>
        ),
        actions: copyAction,
      });
    });

  return (
    <>
      <EuiCommentList comments={comments} />
    </>
  );
}
