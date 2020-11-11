import React from "react";
import { EuiHorizontalRule } from "@elastic/eui";

export default function CheckoutSummary({ cartItems }) {
  return (
    <>
      <div className="w-full tw-px-4 tw-border-none tw-shadow-md sm:tw-shadow tw-rounded tw-bg-white ">
        <div variant="flush" lines="none">
          <div className="tw-pb-0 tw-mb-3 tw-pt-4 tw-flex tw-justify-between tw-items-baseline">
            <div className="tw-flex  tw-items-baseline">
              <div className="tw-font-semibold tw-text-md tw-mr-1">
                Subtotal
              </div>
              <span className="tw-text-gray-900 tw-text-md tw-tracking-wide tw-font-semibold">
                {" "}
                (
                {cartItems &&
                  cartItems.length &&
                  cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                item
                {cartItems.length === 1 ? "" : "s"})
              </span>
            </div>

            <div className="tw-font-semibold tw-text-md tw-tracking-wide">
              $
              {cartItems &&
                cartItems.length &&
                cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
            </div>
          </div>

          <EuiHorizontalRule margin="s" className="tw-bg-gray-300" />

          <div className="tw-border-none tw-tracking-wide">
            <div className="tw-flex tw-pb-3 tw-justify-between">
              <div className="tw-text-sm">Est. tax & fees</div>
              <div className="tw-text-right tw-text-sm">$0.00</div>
            </div>
          </div>
          <div className="tw-border-none ">
            <div className="tw-flex tw-justify-between">
              <div className="tw-text-sm">Delivery fee</div>
              <div className="tw-text-right tw-text-sm tw-tracking-wide">
                FREE
              </div>
            </div>
          </div>
          <EuiHorizontalRule margin="s" className="tw-bg-gray-300" />

          <div lines="none" className="tw-border-none ">
            <div className="tw-flex  tw-justify-between">
              <div className="tw-font-bold tw-text-sm tw-text-gray-900">
                Order total
              </div>
              <div className="tw-text-right tw-font-bold tw-text-sm tw-tracking-wide tw-text-gray-900">
                $
                {cartItems &&
                  cartItems.length &&
                  cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
              </div>
            </div>
          </div>
          <EuiHorizontalRule margin="s" className="tw-bg-gray-300" />

          <p class="tw-justify-end tw-flex  tw-text-xs tw-pt-2  tw-pb-4 tw-px-1 tw-text-center tw-tracking-wide tw-text-gray-800 tw-leading-normal ">
            Taxes (if shown) are estimates. The seller, and not Cropswap, is
            solely responsible for collecting all applicable taxes.
          </p>
        </div>
      </div>
    </>
  );
}
