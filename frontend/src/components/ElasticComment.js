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
  console.log(reviews, "ashshah");
  const comments: EuiCommentProps[] = [];

  reviews &&
    reviews.map((review) => {
      const rating = (
        <EuiText size="s">
          <div className="tw-flex tw-items-baseline tw-gap-2">
            {review.name}
            <Rating value={review.rating} />
          </div>
        </EuiText>
      );
      comments.push({
        username: rating,
        event: "added a comment",
        timestamp: review.createdAt.substring(0),
        children: review.comment,
        actions: copyAction,
      });
    });

  return (
    <>
      <EuiCommentList comments={comments} />
    </>
  );
}
