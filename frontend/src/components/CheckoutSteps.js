import React from "react";
import { EuiStepsHorizontal } from "@elastic/eui";

import { useHistory } from "react-router-dom";

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  const history = useHistory();

  const horizontalSteps = [
    {
      title: "Sign in",
      isComplete: step1,
      isComplete: step1,
      onClick: () => {
        history.push("/login");
      },
    },
    {
      title: "Shipping",
      isSelected: step2,
      isComplete: step3,
      onClick: () => {
        history.push("/shipping");
      },
    },
    {
      title: "Payment",
      isSelected: step3,
      isComplete: step4,
      onClick: () => {
        history.push("/payment");
      },
    },
    {
      title: "Place Order",
      isSelected: step4,
      // isComplete: step4,
      onClick: () => {
        history.push("/placeorder");
      },
    },
  ];
  return <EuiStepsHorizontal steps={horizontalSteps} />;
}
