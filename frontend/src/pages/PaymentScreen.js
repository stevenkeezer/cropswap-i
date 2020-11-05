import {
  EuiButton,
  EuiHorizontalRule,
  EuiRadioGroup,
  EuiShowFor,
} from "@elastic/eui";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CartItem from "../components/CartItem";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const [radioIdSelected, setRadioIdSelected] = useState(0);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  const { shippingAddress, cartItems } = cart;

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
      <div
        style={{ backgroundColor: "#fafbfd" }}
        className="tw-h-screen    tw-antialiased tw-pt-2"
      >
        <div className="tw-max-w-screen-lg tw-text-gray-800 tw-mx-auto ">
          <CheckoutSteps step1 step2 step3 />
        </div>
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-mx-auto tw-max-w-screen-xl sm:tw-px-8 tw-justify-center tw-pb-4 tw-text-gray-800 tw-mt-4  lg:tw-mt-8 tw-mx-auto">
          <div className="tw-col-8 tw-p-0">
            <div className="tw-p-0  lg:tw-pt-0 tw-pb-1  tw-tracking-normal lg:tw-pt-1 tw-px-4 tw-text-gray-900 tw-text-xl tw-font-semibold ">
              Select payment method
            </div>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <div className="tw-mt-3 tw-px-4 sm:tw-px-0 lg:tw-px-4">
              <EuiRadioGroup
                options={[
                  {
                    id: 0,
                    label: (
                      <div
                        class={`card card-body ${
                          radioIdSelected === 0 && "tw-border-blue-500"
                        } d-flex tw-rounded  flex-row justify-content-center align-items-center tw-h-20 tw-w-32 lg:tw-h-32 lg:tw-w-48`}
                      >
                        <div>
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4="
                            data-v-188c8269=""
                            alt=""
                            aria-label="PayPal"
                            class="paypal-logo paypal-logo-paypal paypal-logo-color-blue"
                          />
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 1,
                    label: (
                      <div
                        class={`card card-body 
                        ${radioIdSelected === 1 && "tw-border-blue-500"}
                        d-flex tw-rounded  flex-row justify-content-center align-items-center tw-h-20 tw-w-32 lg:tw-h-32 lg:tw-w-48`}
                      >
                        <div>
                          <span className="tw-font-semibold  tw-flex tw-items-center tw-py-1 tw-gap-2">
                            Credit Card
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 2,
                    disabled: true,
                    label: (
                      <div
                        class={`card card-body 
                        ${radioIdSelected === 2 && "tw-border-blue-500"}
                        d-flex tw-rounded  flex-row justify-content-center align-items-center  tw-h-20 tw-w-32 lg:tw-h-32 lg:tw-w-48`}
                      >
                        <div>
                          <svg
                            className="tw-w-32"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 792 612"
                            enable-background="new 0 0 792 612"
                            xmlSpace="preserve"
                          >
                            <g>
                              <path
                                fill="#3D95CE"
                                d="M202.376,250.999c3.895,6.433,5.651,13.059,5.651,21.429c0,26.696-22.789,61.376-41.285,85.728h-42.246
		l-16.943-101.312l36.991-3.512l8.958,72.09c8.37-13.636,18.699-35.065,18.699-49.675c0-7.997-1.37-13.444-3.511-17.929
		L202.376,250.999z"
                              />
                              <path
                                fill="#3D95CE"
                                d="M250.318,295.611c6.807,0,23.944-3.114,23.944-12.854c0-4.677-3.307-7.01-7.204-7.01
		C260.24,275.747,251.293,283.923,250.318,295.611z M249.538,314.901c0,11.893,6.613,16.559,15.38,16.559
		c9.547,0,18.688-2.333,30.569-8.371l-4.475,30.388c-8.371,4.09-21.417,6.819-34.08,6.819c-32.121,0-43.617-19.48-43.617-43.833
		c0-31.564,18.7-65.079,57.253-65.079c21.226,0,33.095,11.892,33.095,28.451C303.665,306.53,269.403,314.708,249.538,314.901z"
                              />
                              <path
                                fill="#3D95CE"
                                d="M410.414,274.773c0,3.896-0.591,9.547-1.179,13.24l-11.1,70.142h-36.019l10.125-64.298
		c0.192-1.744,0.782-5.255,0.782-7.203c0-4.677-2.922-5.844-6.435-5.844c-4.666,0-9.343,2.141-12.458,3.704l-11.484,73.642h-36.222
		l16.548-105.015h31.35l0.397,8.382c7.396-4.87,17.135-10.137,30.953-10.137C403.979,251.384,410.414,260.739,410.414,274.773z"
                              />
                              <path
                                fill="#3D95CE"
                                d="M517.344,262.88c10.316-7.396,20.057-11.496,33.488-11.496c18.495,0,24.928,9.355,24.928,23.389
		c0,3.896-0.589,9.547-1.177,13.24l-11.087,70.142h-36.029l10.318-65.657c0.19-1.755,0.589-3.896,0.589-5.254
		c0-5.266-2.923-6.434-6.435-6.434c-4.474,0-8.946,1.948-12.266,3.704l-11.482,73.642h-36.02l10.318-65.657
		c0.19-1.755,0.577-3.896,0.577-5.254c0-5.266-2.924-6.434-6.424-6.434c-4.676,0-9.343,2.141-12.458,3.704l-11.493,73.642h-36.21
		l16.546-105.015h30.967l0.973,8.767c7.204-5.254,16.935-10.521,29.98-10.521C506.242,251.384,513.637,256.255,517.344,262.88z"
                              />
                              <path
                                fill="#3D95CE"
                                d="M647.444,293.472c0-8.573-2.144-14.418-8.564-14.418c-14.215,0-17.134,25.131-17.134,37.987
		c0,9.753,2.729,15.789,9.147,15.789C644.329,332.83,647.444,306.327,647.444,293.472z M585.141,315.489
		c0-33.117,17.52-64.105,57.83-64.105c30.374,0,41.477,17.929,41.477,42.676c0,32.733-17.331,66.631-58.613,66.631
		C595.265,360.691,585.141,340.621,585.141,315.489z"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                    ),
                  },
                ]}
                className=" tw-flex tw-gap-4 "
                idSelected={radioIdSelected}
                onChange={(id) => onChange(id)}
                name="radio group"
                // legend={{
                //   children: <span>This is a legend for a radio group</span>,
                // }}
              ></EuiRadioGroup>
            </div>
          </div>

          <div className="tw-p-0 tw-col-4">
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <div className="tw-px-4 sm:tw-px-0">
              <div className=" tw-text-sm lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                Your items
              </div>
            </div>

            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <div className=" tw-text-2xl tw-px-4 sm:tw-px-0 tw-font-medium tw-mt-3 tw-pb-2 tw-max-w-screen-lg tw-text-gray-800 tw-mx-auto ">
              {cartItems && cartItems.map((item) => <CartItem item={item} />)}
            </div>
            <div className="w-full tw-px-4 tw-border-none tw-shadow-md sm:tw-shadow tw-rounded card ">
              <div variant="flush" lines="none">
                <div className="tw-pb-0 tw-pt-6 tw-mb-3  tw-flex tw-justify-between tw-items-baseline">
                  <div className="tw-flex  tw-items-baseline">
                    <div className="tw-font-semibold tw-text-md tw-mr-1 tw-text-gray-900">
                      Subtotal
                    </div>
                    <span className="tw-text-gray-900 tw-text-md tw-tracking-wide tw-font-semibold">
                      {" "}
                      ({cartItems.reduce((acc, item) => acc + item.qty, 0)} item
                      {cartItems.length === 1 ? "" : "s"})
                    </span>
                  </div>

                  <div className="tw-font-semibold tw-text-md tw-tracking-wide tw-text-gray-900">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                </div>

                <EuiHorizontalRule margin="s" />

                <div className="tw-border-none tw-tracking-wide">
                  <Row className=" tw-pb-3">
                    <Col className="tw-text-sm">Est. tax & fees</Col>
                    <Col className="tw-text-right tw-text-sm">$0.00</Col>
                  </Row>
                </div>
                <div className="tw-border-none ">
                  <Row className="">
                    <Col className="tw-text-sm">Delivery fee</Col>
                    <Col className="tw-text-right tw-text-sm tw-tracking-wide">
                      FREE
                    </Col>
                  </Row>
                </div>
                <EuiHorizontalRule margin="s" />

                <div lines="none" className="tw-border-none ">
                  <Row>
                    <Col className="tw-font-bold tw-text-sm tw-text-gray-900">
                      Order total
                    </Col>
                    <Col className="tw-text-right tw-font-bold tw-text-sm tw-tracking-wide tw-text-gray-900">
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Col>
                  </Row>
                </div>
                <EuiHorizontalRule margin="s" />
                <p class="tw-justify-end  tw-py-2 tw-text-xs tw-text-center tw-tracking-wide  tw-text-gray-800 tw-leading-normal">
                  You will have an opportunity to review and modify this order
                  before its final.
                </p>
              </div>
            </div>

            <div className=" tw-px-4 sm:tw-px-0 tw-tracking-wide">
              <EuiButton
                fullWidth
                color="secondary"
                className="tw-mt-3 tw-font-semibold"
                size="m"
                fill
                disabled={cartItems.length === 0}
                onClick={submitHandler}
              >
                Order summary
              </EuiButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
