import React, { Fragment } from "react";

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui";
import SubFooter from "./SubFooter";

const OrdersEmpty = ({ history }) => (
  <>
    <EuiEmptyPrompt
      iconType={"/cartEmpty.svg"}
      title={<h2>No orders yet.</h2>}
      actions={
        <EuiButton onClick={() => history.push("/")} color="secondary" fill>
          Back to home
        </EuiButton>
      }
    />
  </>
);

export default OrdersEmpty;
