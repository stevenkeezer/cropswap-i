// MOBX
import { EuiCallOut } from "@elastic/eui";
import React, { useState } from "react";

function AlertDismissible() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <EuiCallOut
        className="tw-bg-blue-700  tw-text-white tw-w-full"
        // iconType={<div className="tw-text-white">X</div>}
        size="s"
      >
        <div className="tw-text-white tw-flex tw-max-w-screen-xl tw-my-1 tw-mx-auto tw-justify-between  tw-px-2 sm:tw-px-4 tw-w-full">
          <div className="tw-truncate">
            <span className="font-weight-bold whitespace-no-wrap ">
              COVID-19 IMPACT{" "}
            </span>
            Learn more about how the Coronavirus is impacting farming
            communities here.
          </div>
          <div onClick={() => setShow(!show)} className="tw-text-white">
            <svg
              class="tw-w-4 tw-h-4 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </EuiCallOut>
    );
  }
  return "";
}

export default AlertDismissible;
