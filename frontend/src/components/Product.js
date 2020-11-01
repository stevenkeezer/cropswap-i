import React, { useEffect } from "react";
import {
  EuiCard,
  EuiFlexItem,
  EuiText,
  EuiLoadingContent,
  EuiSpacer,
  EuiShowFor,
} from "@elastic/eui";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "./LazyImage";

export default function Product({ product, history, scrollPosition }) {
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    history.push(`/product/${id}`);
  };

  console.log(product.image.preSrc, "ah");

  return (
    <>
      <EuiFlexItem
        className="flexCard  "
        onClick={(e) => clickHandler(product._id)}
      >
        {product.image ? (
          <EuiCard
            paddingSize="none"
            textAlign="left"
            rounded="false"
            image={
              <LazyImage
                src={product.image}
                placeholder={product.image}
                height={200}
              />
            }
            grow={false}
            display="plain"
            className="tw-object-fit"
            title={
              <EuiText>
                <div className="tw-cursor-pointer tw-text-gray-800 tw-text-xs  tw-font-medium tw-tracking-wide">
                  {product.category}
                </div>
                <div className="tw-cursor-pointer tw-text-gray-800  tw-text-sm tw-font-semibold tw-tracking-wide">
                  {product.name}
                </div>
              </EuiText>
            }
            description={
              <EuiText>
                <div className="tw-cursor-pointer tw-text-gray-800 tw-text-xs sm:tw-text-sm tw-font-medium tw-tracking-wide">
                  ${product.price}
                </div>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </EuiText>
            }
          />
        ) : (
          <EuiLoadingContent lines={3} />
        )}
        <EuiShowFor sizes={["m", "l", "xl"]}>
          <EuiSpacer />
        </EuiShowFor>
        <EuiSpacer />
      </EuiFlexItem>
    </>
  );
}
