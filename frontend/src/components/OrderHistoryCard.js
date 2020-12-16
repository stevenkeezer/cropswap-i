import React from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiHorizontalRule,
  EuiButton,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../actions/cartActions";
import LazyImage from "./LazyImage";

export default function OrderHistoryCard({
  orders,
  history,
  setIsCartPopoverOpen,
}) {
  const dispatch = useDispatch();

  const addToCartHandler = (id, qty) => {
    setIsCartPopoverOpen(true);
    dispatch(addToCart(id, qty));
  };
  return (
    <>
      {orders &&
        orders.map((order) => (
          <div className="tw-w-full tw-bg-white  tw-mb-3   tw-shadow tw-rounded">
            <div
              onClick={() => history.push(`/order/${order._id}`)}
              style={{ lineHeight: ".85rem" }}
              className="tw-px-4 tw-pt-5 order-history-header tw-items-center  tw-cursor-pointer tw-pb-5"
            >
              <div className="tw-text-sm  tw-text-gray-800 tw-font-bold ">
                Address{" "}
                <div className="tw-font-normal tw-mt-2 tw-text-xs tw-text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Status
                <div className="tw-mt-1  tw-text-gray-800 tw-text-xs tw-font-bold">
                  {order.isDelivered ? "Complete" : "In progress"}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Order
                <div className="tw-mt-1  tw-truncate tw-w-20  tw-text-gray-800 tw-text-xs tw-font-bold">
                  {order && order._id}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Placed{" "}
                <div className="tw-mt-1  tw-text-gray-800 tw-text-xs tw-tracking-normal tw-font-bold">
                  {order && new Date(order.createdAt).toLocaleDateString()},{" "}
                  {order &&
                    new Date(order.createdAt)
                      .toLocaleTimeString([], {
                        timeStyle: "short",
                      })
                      .split(" ")[0] +
                      new Date(order.createdAt)
                        .toLocaleTimeString([], {
                          timeStyle: "short",
                        })
                        .split(" ")[1]
                        .toLowerCase()}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Total{" "}
                <div className="tw-mt-1  tw-text-gray-800 tw-text-xs tw-font-bold">
                  ${order && order.totalPrice}
                </div>
              </div>
              <div
                onClick={() => history.push(`/order/${order._id}`)}
                className="tw-text-sm tw-text-teal-600 tw-ml-auto tw-tracking-normal tw-cursor-pointer"
              >
                View order details
              </div>
            </div>
            <EuiHorizontalRule margin="none" className="tw-bg-gray-200" />

            <div
              onClick={() => history.push(`/order/${order._id}`)}
              className="tw-flex tw-justify-between sm:tw-items-center tw-flex-col sm:tw-flex-row tw-cursor-pointer tw-px-4 "
            >
              <div className="tw-flex  tw-my-4">
                {order.orderItems.map((order) => (
                  <div className="tw-mr-5">
                    <LazyImage
                      src={order.image}
                      alt={order.name}
                      height={88}
                      width={88}
                      border={"0.0625rem solid rgb(230, 229, 229)"}
                      rounded={"0.125rem"}
                      placeholder={order.image}
                    />
                  </div>
                ))}
              </div>
              <div className="tw-flex-col tw-py-3">
                <div>
                  <EuiButton
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      order.orderItems.forEach((e) =>
                        addToCartHandler(e.product, e.qty)
                      );
                    }}
                    className="sm:tw-w-56 tw-text-sm  tw-font-bold tw-text-white tw-bg-orange-500 tw-shadow-none tw-font-bold tw-border-none tw-no-underline tw-mb-3"
                  >
                    Reorder all
                  </EuiButton>
                </div>
                <div>
                  <EuiButton
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push("/");
                    }}
                    className="sm:tw-w-56 tw-text-sm  tw-font-bold tw-border-gray-400 tw-border-opacity-75 tw-font-bold tw-shadow-none tw-text-gray-800 tw-no-underline"
                  >
                    Return to menu
                  </EuiButton>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
