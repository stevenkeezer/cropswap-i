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
import LazyImage from "./LazyImage";

export default function OrderHistoryCard({ orders, history }) {
  return (
    <>
      {orders &&
        orders.map((order) => (
          <div className="tw-w-full tw-bg-white tw-tracking-wide tw-mb-3   tw-shadow tw-rounded">
            <div
              onClick={() => history.push(`/order/${order._id}`)}
              className="tw-px-4 tw-pt-5 order-history-header tw-items-center tw-cursor-pointer tw-pb-5"
            >
              <div className="tw-text-sm  tw-text-gray-900 tw-font-semibold ">
                Address{" "}
                <div className="tw-font-normal tw-mt-1 tw-text-xs tw-text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Status
                <div className="tw-mt-1  tw-text-gray-900 tw-text-xs tw-font-semibold">
                  {order.isDelivered ? "Complete" : "In progress"}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Order
                <div className="tw-mt-1  tw-truncate tw-w-24  tw-text-gray-900 tw-text-xs tw-font-semibold">
                  {order && order._id}
                </div>
              </div>
              <div className="tw-text-xs tw-text-gray-700">
                Placed{" "}
                <div className="tw-mt-1  tw-text-gray-900 tw-text-xs tw-tracking-normal tw-font-semibold">
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
                <div className="tw-mt-1  tw-text-gray-900 tw-text-xs tw-font-semibold">
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
              className="tw-flex tw-justify-between tw-items-center tw-cursor-pointer tw-px-4 "
            >
              <div className="tw-flex tw-mt-auto tw-pb-4 tw-gap-5">
                {order.orderItems.map((order) => (
                  <LazyImage
                    src={order.image}
                    alt={order.name}
                    height={88}
                    width={88}
                    border={"0.0625rem solid rgb(230, 229, 229);"}
                    rounded={"0.125rem"}
                    placeholder={order.image}
                  />
                ))}
              </div>
              <div className="tw-flex-col tw-my-4">
                <div>
                  <EuiButton className="tw-w-48 tw-text-sm  tw-font-semibold tw-text-white tw-bg-orange-500 tw-shadow-none tw-font-bold tw-border-none tw-no-underline tw-mb-3">
                    Reorder all
                  </EuiButton>
                </div>
                <div>
                  <EuiButton
                    onClick={() => history.push("/")}
                    className="tw-w-48 tw-text-sm  tw-font-semibold tw-border-gray-400 tw-border-opacity-75 tw-font-bold tw-shadow-none tw-text-gray-900 tw-no-underline"
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
