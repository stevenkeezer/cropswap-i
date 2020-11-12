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

  if (!shippingAddress) {
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
          <div className="tw-flex tw-flex-col tw-justify-between tw-mx-auto tw-w-full sm:tw-px-4 tw-max-w-screen-xl lg:tw-flex-row  tw-pb-4 tw-text-gray-800 tw-mt-4 ">
            <div className="tw-p-0 tw-w-full ">
              <div className=" tw-text-sm tw-mt-0 tw-px-4 sm:tw-px-0  xl:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                Payment method
              </div>

              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>

              <div className="tw-mt-3 sm:tw-px-0 tw-px-4 ">
                <EuiRadioGroup
                  options={[
                    {
                      id: 0,
                      label: (
                        <EuiFlexItem>
                          <EuiPanel className="tw-p-10 tw-w-40">
                            <img
                              className="tw-h-6 "
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4="
                              data-v-188c8269=""
                              alt=""
                              aria-label="PayPal"
                            />
                          </EuiPanel>
                        </EuiFlexItem>
                      ),
                    },
                    {
                      id: 1,
                      label: (
                        <EuiFlexItem>
                          <EuiPanel className="tw-p-10 tw-w-40">
                            <div className="tw-pt-1 ">Credit card</div>
                          </EuiPanel>
                        </EuiFlexItem>
                      ),
                    },
                  ]}
                  idSelected={radioIdSelected}
                  className=""
                  onChange={(id) => onChange(id)}
                  name="radio group"
                ></EuiRadioGroup>
              </div>
            </div>

            <div className="tw-p-0 xl:tw-w-1/2 sm:tw-mt-6 ">
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
                    disabled={cartItems.length === 0}
                    onClick={submitHandler}
                  >
                    Order summary
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
