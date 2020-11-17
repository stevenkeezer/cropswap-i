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

  return (
    <>
      <EuiFlexItem
        className="flexCard"
        onClick={(e) => clickHandler(product._id)}
      >
        {product.image ? (
          <EuiCard
            paddingSize="none"
            textAlign="left"
            rounded="false"
            image={
              <>
                <EuiShowFor sizes={["xs"]}>
                  <div className="tw-cursor-pointer">
                    <LazyImage
                      src={product.image}
                      height={"20vh"}
                      placeholder={product.image}
                    />
                  </div>
                </EuiShowFor>

                <EuiShowFor sizes={["s", "m", "l", "xl"]}>
                  <div className="tw-cursor-pointer">
                    <LazyImage
                      src={product.image}
                      placeholder={product.image}
                      height={200}
                    />
                  </div>
                </EuiShowFor>
              </>
            }
            grow={false}
            display="plain"
            className="tw-object-fit product-card"
            title={
              <div className="tw-leading-5">
                <div className="tw-cursor-pointer tw-capitalize tw-text-gray-700 tw-text-xs tw-tracking-wide">
                  {product.category}
                </div>
                <div className="tw-cursor-pointer tw-text-gray-800  tw-text-base tw-font-semibold tw-tracking-wide">
                  {product.name}
                </div>
              </div>
            }
            description={
              <div>
                <Rating value={product.rating} text={`${product.numReviews}`} />
                <div className="tw-cursor-pointer tw-text-gray-800  tw-text-md tw-items-baseline tw-flex  tw-font-bold tw-tracking-normal">
                  ${product.price}
                  <span className=" tw-text-xs tw-text-gray-800 tw-px-1 tw-text-opacity-75 tw-font-medium tw-tracking-normal">
                    each
                  </span>
                </div>
                <div
                  style={{ color: "#B12704" }}
                  className="tw-text-sm tw--mt-1  tw-font-medium tw-tracking-normal"
                >
                  {product.countInStock <= 20 &&
                    product.countInStock > 0 &&
                    `Only ${product.countInStock} left in stock - order soon.`}
                </div>
              </div>
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
