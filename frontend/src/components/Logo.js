import React from "react";

import { EuiIcon, EuiHeaderSectionItemButton } from "@elastic/eui";

export default ({ history }) => (
  <EuiHeaderSectionItemButton
    onClick={(e) => history.push("/")}
    border="right"
    className="tw-mr-1"
  >
    <EuiIcon
      size="original"
      style={{ height: 43, width: 43 }}
      type="/images/shopping.svg"
      className="tw-bg-gray-300 tw-p-2 tw-rounded-full tw-shadow-sm"
    ></EuiIcon>
  </EuiHeaderSectionItemButton>
);
