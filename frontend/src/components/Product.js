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
        className="flexCard  "
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
                  <LazyImage
                    src={product.image}
                    height={"20vh"}
                    placeholder={product.image}
                  />
                </EuiShowFor>
                <EuiShowFor sizes={["s", "m"]}>
                  <LazyImage
                    src={product.image}
                    placeholder={product.image}
                    height={200}
                  />
                </EuiShowFor>
                <EuiShowFor sizes={["l", "xl"]}>
                  <LazyImage
                    src={product.image}
                    placeholder={product.image}
                    height={200}
                  />
                </EuiShowFor>
              </>
            }
            grow={false}
            display="plain"
            className="tw-object-fit"
            title={
              <EuiText>
                <div className="tw-cursor-pointer tw-text-gray-800 tw-text-xs tw-tracking-wide">
                  {product.category}
                </div>
                <div className="tw-cursor-pointer tw-text-gray-800  tw-font-semibold tw-tracking-wide">
                  {product.name}
                </div>
              </EuiText>
            }
            description={
              <EuiText>
                <div className="tw-cursor-pointer tw-text-gray-800 tw-text-sm tw-font-medium tw-tracking-wide">
                  ${product.price}
                  <span className="tw-text-gray-700"> each</span>
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
