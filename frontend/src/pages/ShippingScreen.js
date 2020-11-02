import {
  EuiAccordion,
  EuiButton,
  EuiButtonIcon,
  EuiCheckbox,
  EuiFieldText,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiShowFor,
  EuiSpacer,
  EuiTextArea,
} from "@elastic/eui";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import SubFooter from "../components/SubFooter";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, loading, cartItems } = cart;
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(
    shippingAddress && shippingAddress.address
  );
  const [city, setCity] = useState(shippingAddress && shippingAddress.city);
  const [postalCode, setPostalCode] = useState(
    shippingAddress && shippingAddress.postalCode
  );
  const [country, setCountry] = useState(
    shippingAddress && shippingAddress.country
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <>
      <div
        style={{ backgroundColor: "#fafbfd" }}
        className=" tw-min-h-screen tw-pb-12 tw-pt-2 tw-antialiased"
      >
        <div className="tw-max-w-screen-lg tw-text-gray-800 tw-mx-auto">
          <CheckoutSteps step1 step2 />
        </div>

        <div className=" tw-max-w-screen-xl sm:tw-px-4 tw-mx-auto tw-flex tw-flex-col sm:tw-mt-4 tw-pt-4 lg:tw-flex-row">
          <div className="lg:tw-w-3/5 tw-w-full">
            <div className=" tw-text-xl  sm:tw-pt-4 tw-pb-3 tw-max-w-screen-lg ">
              <div className="tw-p-0  tw-pb-1  tw-tracking-normal lg:tw-pt-1 tw-px-4 tw-text-gray-900 tw-text-xl tw-font-semibold ">
                Confirm delivery details
              </div>
              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" />
              </EuiShowFor>
              <div className="tw-flex tw-px-4 tw-gap-8">
                <div className="tw-flex tw-items-center tw-text-sm tw-font-medium tw-text-gray-800 sm:tw-pt-3">
                  <svg
                    class="tw-w-5 tw-h-5 tw-mr-2 tw-text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {userInfo.name}
                </div>
              </div>
              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" />
              </EuiShowFor>

              <div className="tw-px-4">
                <div className=" tw-text-sm tw-mt-8 lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                  Your items
                </div>
              </div>

              <EuiShowFor sizes={["xs", "s", "m"]}>
                <EuiHorizontalRule margin="s" />
              </EuiShowFor>
              <div className="sm:tw-bg-white tw-shadow-md sm:tw-shadow tw-px-4 sm:tw-mx-4 sm:tw-p-4 tw-py-4  sm:tw-rounded">
                <EuiAccordion
                  id="accordionExtraWithRightArrow"
                  arrowDisplay="none"
                  initialIsOpen={address === "" && true}
                  buttonClassName="focus:tw-outline-none tw-no-underline tw-truncate"
                  buttonContentClassName="tw-flex tw-w-full tw-mb-2 tw-justify-between"
                  buttonContent={
                    <>
                      <div className="tw-flex tw-items-center tw-w-11/12  tw-justify-between">
                        <div className="tw-flex tw-w-full tw-items-center">
                          <svg
                            class="tw-w-5 tw-h-5 tw-text-gray-800 tw-mr-3 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <div className="tw-truncate tw-text-sm tw-text-gray-800 tw-w-11/12">
                            {address}, {city}, {country}, {postalCode}
                          </div>
                        </div>
                      </div>
                      <div className="tw-text-xs sm:tw-text-sm tw-right-auto tw-text-teal-600 tw-font-medium">
                        Edit
                      </div>
                    </>
                  }
                  paddingSize="l"
                >
                  <EuiFlexItem>
                    <EuiFormRow
                      fullWidth
                      helpText="No shipping available right now this app is still in development!"
                      label="Address"
                    >
                      <EuiFieldText
                        placeholder="Address"
                        className="tw-mb-3"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiSpacer />

                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <EuiFormRow fullWidth label="City">
                        <EuiFieldText
                          fullWidth
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </EuiFormRow>
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiFormRow fullWidth label="Country">
                        <EuiFieldText
                          fullWidth
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiFormRow fullWidth label="Postal Code">
                        <EuiFieldText
                          fullWidth
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiAccordion>

                <EuiTextArea
                  fullWidth
                  className="tw-rounded"
                  placeholder="Special delivery instructions (e.g. Apt. number, gate code, ect.)"
                  aria-label="Use aria labels when no actual label is in use"
                  value={value}
                  onChange={(e) => onChange(e)}
                />
                <div className="tw-pt-3 tw-flex tw-items-baseline ">
                  <div>
                    <EuiCheckbox checked />
                  </div>
                  <div className="tw-pl-5 tw-text-sm  tw-text-gray-800 tw-tracking-wide">
                    Set as default home address
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:tw-w-2/5 tw-mt-5 lg:tw-mt-0 tw-w-full">
            <div className="w-full tw-px-4 tw-border-none sm:tw-mx-4 tw-shadow-md sm:tw-shadow tw-rounded card ">
              <div variant="flush" lines="none">
                <div className="tw-pb-0 tw-pt-6 tw-mb-3   tw-flex tw-justify-between tw-items-baseline">
                  <div className="tw-flex  tw-items-baseline">
                    <div className="tw-font-semibold tw-text-md tw-mr-1">
                      Subtotal
                    </div>
                    <span className="tw-text-gray-900 tw-text-md tw-tracking-wide tw-font-semibold">
                      {" "}
                      ({cartItems.reduce((acc, item) => acc + item.qty, 0)} item
                      {cartItems.length === 1 ? "" : "s"})
                    </span>
                  </div>

                  <div className="tw-font-semibold tw-text-md tw-tracking-wide">
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
              </div>
              <p class="tw-justify-end tw-flex mb-3 sm:tw-px-4 tw-px-5 tw-text-xs tw-text-center tw-tracking-wide tw-text-gray-800 tw-leading-normal tw-pt-2">
                Taxes (if shown) are estimates. The seller, and not Cropswap, is
                solely responsible for collecting all applicable taxes.
              </p>
            </div>

            <div className="tw-px-4 tw-pt-3">
              <EuiButton
                fullWidth
                color="secondary"
                className=" tw-font-semibold "
                size="m"
                fill
                disabled={cartItems.length === 0}
                onClick={submitHandler}
              >
                Continue to payment
              </EuiButton>
            </div>
            <br></br>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <div className="tw-px-4">
              <div className=" tw-text-sm lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                Your items
              </div>
            </div>

            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>
            <div className=" tw-text-2xl tw-font-medium  tw-px-4 tw-mt-3 tw-pb-2 tw-max-w-screen-lg tw-text-gray-800 tw-mx-auto ">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="tw-bg-white tw-rounded tw-mb-1 tw-border card tw-border-gray-400 sm:tw-border-none sm:tw-shadow tw-border-opacity-75 ">
                    <div class="row tw-py-3 tw-px-4">
                      <div class=" tw-flex  tw-gap-2">
                        <div class="tw-flex  tw-pl-3  tw-items-center">
                          <img
                            className="tw-m-0 tw-object-cover tw-w-16 tw-h-16 "
                            allowFullScreen
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <div className="tw-flex tw-flex-grow sm:tw-px-3 tw-px-2  tw-justify-between ">
                        <div className="  tw-items-center tw-justify-around">
                          <Link to={`/product/${item.product}`}>
                            <div className="tw-text-sm tw-text-gray-800 tw-font-semibold tw-tracking-wide">
                              {item.name}
                            </div>
                            <div class="tw-text-gray-800 tw-text-sm tw-py-1">
                              Each
                            </div>
                            <div class="tw-text-gray-800 tw-text-sm tw-tracking-wide ">
                              ${item.price}
                            </div>
                          </Link>
                        </div>
                        <div
                          class={` tw-text-sm  tw-tracking-wide tw-font-semibold tw-mt-auto tw-py-1 tw-align-baseline `}
                        >
                          x{item.qty}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingScreen;
