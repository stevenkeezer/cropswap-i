import React, { useState } from "react";

import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
} from "@elastic/eui";

const CheckoutBottomBar = ({ children }) => {
  const [showBar, setShowBar] = useState(true);

  const button = (
    <EuiButton color="primary" onClick={() => console.log("hi")}>
      Toggle appearance of the bottom bar
    </EuiButton>
  );

  const bottomBar = (
    <EuiBottomBar style={{ backgroundColor: "white" }}>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false} className="tw-ml-auto">
          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>{children}</EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiBottomBar>
  );

  return <div>{bottomBar}</div>;
};

export default CheckoutBottomBar;
