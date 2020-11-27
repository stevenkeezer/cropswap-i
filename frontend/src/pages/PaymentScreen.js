import {
  EuiButton,
  EuiHorizontalRule,
  EuiRadioGroup,
  EuiPage,
  EuiShowFor,
  EuiPanel,
  EuiPageContentHeader,
  EuiFlexItem,
  EuiText,
  EuiPageBody,
  EuiPageContent,
} from "@elastic/eui";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CartItem from "../components/CartItem";
import CheckoutSteps from "../components/CheckoutSteps";
import CheckoutSummary from "../components/CheckoutSummary";
import PaymentSelect from "../components/PaymentSelect";
import { NProgress } from "@tanem/react-nprogress";
import Bar from "../components/Bar";
import Container from "../components/Container";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const [radioIdSelected, setRadioIdSelected] = useState(0);
  // const [loading, setLoading] = useState(false);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  const { shippingAddress, cartItems, loading } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    history.push("/placeorder");
  };
  return (
    <>
      <NProgress isAnimating={loading}>
        {({ animationDuration, isFinished, progress }) => (
          <Container
            animationDuration={animationDuration}
            isFinished={isFinished}
          >
            <Bar animationDuration={animationDuration} progress={progress} />
            {/* <Spinner /> */}
          </Container>
        )}
      </NProgress>
      <EuiPage className="tw-px-0 sm:tw-px-4 xl:tw-px-0  tw-min-h-screen  tw-bg-white lg:tw-bg-gray-200 lg:tw-bg-opacity-25">
        <EuiPageBody>
          <div className="tw-px-4">
            <CheckoutSteps step1 step2 step3 />
          </div>
          <div className="tw-flex tw-flex-col tw-justify-between tw-gap-8 tw-mx-auto tw-w-full sm:tw-px-4 tw-max-w-screen-xl lg:tw-flex-row  tw-pb-4 tw-text-gray-800 tw-mt-4 ">
            <div className="tw-p-0 tw-w-full ">
              <div className=" tw-text-sm tw-mt-0 tw-px-4 sm:tw-px-0   tw-w-full tw-tracking-wide tw-text-gray-700">
                Payment method
              </div>

              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>

              <div className="tw-mt-3 sm:tw-px-0 tw-px-4 ">
                <PaymentSelect />
              </div>
            </div>

            <div className="tw-p-0  sm:tw-mt-6 ">
              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>
              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>

              <CheckoutSummary cartItems={cartItems} />
              <div className=" tw-px-4 tw-pb-4 sm:tw-px-0 tw-tracking-wide">
                <div className="sm:tw-p-4 sm:tw-bg-white sm:tw-shadow sm:tw-rounded tw-mt-2">
                  <EuiButton
                    fullWidth
                    color="secondary"
                    className="tw-font-semibold"
                    size="m"
                    fill
                    isDisabled={cartItems.length === 0}
                    onClick={submitHandler}
                  >
                    Continue
                  </EuiButton>
                </div>
              </div>
              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>
              <div className="tw-px-4 sm:tw-px-0">
                <div className=" tw-text-sm tw-pt-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                  Your items
                </div>
              </div>

              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>

              <div className=" tw-text-2xl tw-px-4 sm:tw-px-0 tw-font-medium tw-mt-3 tw-pb-2 tw-text-gray-800 tw-mx-auto ">
                {cartItems && cartItems.map((item) => <CartItem item={item} />)}
              </div>
            </div>
          </div>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default PaymentScreen;
