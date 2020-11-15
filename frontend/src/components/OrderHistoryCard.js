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

export default function OrderHistoryCard({ orders }) {
  return (
    <>
      {orders &&
        orders.map((order) => (
          <div className="tw-w-full tw-bg-white tw-tracking-wide tw-mb-3  tw-shadow tw-rounded">
            <div className="tw-px-4 tw-pt-5 order-history-header  tw-pb-4">
              <div className="tw-text-xs tw-text-gray-700">Address</div>
              <div className="tw-text-xs tw-text-gray-700">Status</div>
              <div className="tw-text-xs tw-text-gray-700">Order</div>
              <div className="tw-text-xs tw-text-gray-700">Placed</div>
              <div className="tw-text-xs tw-text-gray-700">Total</div>
              <div className="tw-text-sm tw-text-teal-600">
                View order details
              </div>
            </div>
            <EuiHorizontalRule margin="none" className="tw-bg-gray-200" />
            <div className="tw-flex tw-justify-between tw-items-center tw-px-4 ">
              <div className="tw-flex tw-py-4 tw-gap-4">
                {order.orderItems.map((order) => (
                  <LazyImage
                    src={order.image}
                    alt={order.name}
                    height={75}
                    placeholder={order.image}
                  />
                ))}
              </div>
              <div className="tw-flex-col ">
                <div>
                  <EuiButton className="tw-w-48 tw-text-sm tw-font-semibold tw-mb-3">
                    Reorder all
                  </EuiButton>
                </div>
                <div>
                  <EuiButton className="tw-w-48 tw-text-sm tw-font-semibold">
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
