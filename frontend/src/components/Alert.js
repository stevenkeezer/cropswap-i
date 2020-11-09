// MOBX
import { EuiCallOut } from "@elastic/eui";
import React, { useState } from "react";

function AlertDismissible() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <EuiCallOut
        style={{ backgroundColor: "rgb(35, 118, 215)" }}
        className=" tw-items-center  tw-m-0 tw-p-0 tw-px-4 tw-py-3 tw-border-none tw-text-white tw-w-full"
        // iconType={<div className="tw-text-white">X</div>}
        size="l"
      >
        <div className="tw-text-white tw-flex tw-max-w-screen-xl tw-items-center  tw-mx-auto tw-justify-between  lg:tw-px-4 tw-w-full">
          <div className="">
            <span className="tw-font-bold tw-whitespace-no-wrap tw-text-sm  ">
              COVID-19 IMPACT{" "}
            </span>
            Learn more about how the Coronavirus is impacting farming
            communities <span className="tw-underline">here</span>.
          </div>
          <div
            onClick={() => setShow(!show)}
            style={{ paddingTop: 3, paddingBottom: 3 }}
            className="tw-text-white  tw--mr-1 tw-my-auto"
          >
            <svg
              class="tw-w-5 tw-h-5 tw-my-auto"
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
