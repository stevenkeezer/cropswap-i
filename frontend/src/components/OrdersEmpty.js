import React, { Fragment } from "react";

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui";
import SubFooter from "./SubFooter";

const OrdersEmpty = ({ history }) => (
  <>
    <EuiEmptyPrompt
      iconType={"/cartEmpty.svg"}
      className="tw-mt-6"
      title={<h2>You don't have any orders yet.</h2>}
      actions={
        <EuiButton
          onClick={() => history.push("/")}
          color="secondary"
          className="tw-font-semibold"
          fill
        >
          Back to shopping
        </EuiButton>
      }
    />
  </>
);

export default OrdersEmpty;
