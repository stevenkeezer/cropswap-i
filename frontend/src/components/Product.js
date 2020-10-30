import React, { useEffect } from "react";
import {
  EuiCard,
  EuiFlexItem,
  EuiText,
  EuiLoadingContent,
  EuiSpacer,
} from "@elastic/eui";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";

export default function Product({ product, history }) {
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    history.push(`/product/${id}`);
  };

  console.log(product, "ah");

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
              <img
                className=" tw-w-auto tw-object-cover tw-cursor-pointer"
                src={product.image}
                style={{ borderRadius: "0px!important" }}
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
      </EuiFlexItem>
    </>
  );
}
