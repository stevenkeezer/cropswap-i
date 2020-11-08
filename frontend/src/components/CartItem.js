import React from "react";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  return (
    <div className="tw-bg-white tw-rounded tw-mb-1 tw-border tw-border-gray-400 sm:tw-border-none tw-shadow tw-border-opacity-75 ">
      <div class="tw-flex tw-py-4 tw-px-1">
        <div class=" tw-flex  tw-gap-2">
          <div class="tw-flex  tw-pl-3  tw-items-center">
            <img
              className="tw-m-0 tw-object-cover tw-w-16 tw-h-16 "
              allowFullScreen
              src={item.image}
              alt={item.name}
            />
          </div>
        </div>
        <div className="tw-flex tw-flex-grow sm:tw-px-3 tw-px-2  tw-justify-between ">
          <div className="  tw-items-center tw-justify-around">
            <Link to={`/product/${item.product}`}>
              <div className="tw-text-sm tw-text-gray-800 tw-font-semibold tw-tracking-wide">
                {item.name}
              </div>
              <div class="tw-text-gray-800 tw-text-sm tw-py-1">Each</div>
              <div class="tw-text-gray-800 tw-text-sm tw-tracking-wide ">
                ${item.price}
              </div>
            </Link>
          </div>
          <div
            class={` tw-text-sm  tw-tracking-wide tw-font-semibold tw-mt-auto tw-py-1 tw-align-baseline `}
          >
            x{item.qty}
          </div>
        </div>
      </div>
    </div>
  );
}
