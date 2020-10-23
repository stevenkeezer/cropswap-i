import React from "react";

import { EuiIcon, EuiHeaderSectionItemButton } from "@elastic/eui";

export default ({ history }) => (
  <EuiHeaderSectionItemButton
    onClick={(e) => history.push("/")}
    border="right"
    className="xl:tw-mr-6 "
  >
    <EuiIcon
      size="xl"
      type="/images/shopping.svg"
      className="tw-bg-gray-300 tw-p-1 tw-rounded-full tw-shadow"
    ></EuiIcon>
  </EuiHeaderSectionItemButton>
);
