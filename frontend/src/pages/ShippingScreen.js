import {
  EuiAccordion,
  EuiButton,
  EuiCheckbox,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiShowFor,
  EuiSpacer,
  EuiTextArea,
} from "@elastic/eui";
import { NProgress } from "@tanem/react-nprogress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import Bar from "../components/Bar";
import CartItem from "../components/CartItem";
import CheckoutSteps from "../components/CheckoutSteps";
import CheckoutSummary from "../components/CheckoutSummary";
import Container from "../components/Container";

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
      <EuiPage className="tw-px-0 tw-min-h-screen  tw-bg-white lg:tw-bg-gray-200 lg:tw-bg-opacity-25">
        <EuiPageBody component="div">
          <div className="tw-px-4">
            <CheckoutSteps step1 step2 />
          </div>

          <EuiPageContent className="tw-bg-transparent tw-p-0 tw-pt-4  tw-shadow-none">
            <EuiPageBody className="tw-py-0">
              <div className=" tw-w-full lg:tw-max-w-screen-xl sm:tw-px-4 lg:tw-mx-auto tw-gap-8 tw-flex tw-flex-col xl:tw-flex-row">
                <div className=" tw-w-full">
                  <div className=" tw-text-xl tw-pt-0  tw-pb-3">
                    <EuiShowFor sizes={["xs", "s", "m"]}>
                      <EuiHorizontalRule
                        margin="s"
                        className="tw-bg-gray-200"
                      />
                    </EuiShowFor>

                    <div className="tw-px-4 sm:tw-px-0">
                      <div className=" tw-text-sm tw-mt-0 tw-pb-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                        Your address
                      </div>
                    </div>

                    <EuiShowFor sizes={["xs", "s", "m"]}>
                      <EuiHorizontalRule
                        margin="s"
                        className="tw-bg-gray-200"
                      />
                    </EuiShowFor>
                    <div className="sm:tw-bg-white tw-shadow-md sm:tw-shadow tw-px-4 sm:tw-pt-2 tw-pb-4  sm:tw-rounded">
                      <EuiAccordion
                        id="accordionExtraWithRightArrow"
                        arrowDisplay="none"
                        paddingSize="none"
                        initialIsOpen={
                          !address || !city || !country || !postalCode
                        }
                        className="tw-pb-2 tw-pt-1"
                        buttonClassName="focus:tw-outline-none tw-no-underline tw-truncate"
                        buttonContentClassName="tw-flex tw-w-full  tw-justify-between"
                        buttonContent={
                          <>
                            <div className="tw-flex  tw-items-center tw-w-11/12  tw-justify-between">
                              <div className="tw-flex tw-mb-2 tw-w-full tw-items-center">
                                <svg
                                  class="tw-w-5 tw-h-5 tw-text-gray-700 tw-mr-3 "
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

                                <div className="tw-truncate  tw-text-sm tw-text-gray-800 tw-w-11/12">
                                  {!address ? (
                                    <button className="tw-text-red-500">
                                      Enter address
                                    </button>
                                  ) : (
                                    address
                                  )}
                                  ,{" "}
                                  {!city ? (
                                    <button className="tw-text-red-500">
                                      Enter city
                                    </button>
                                  ) : (
                                    city
                                  )}
                                  ,{" "}
                                  {!country ? (
                                    <button className="tw-text-red-500">
                                      Enter country
                                    </button>
                                  ) : (
                                    country
                                  )}
                                  ,{" "}
                                  {!postalCode ? (
                                    <button className="tw-text-red-500">
                                      Enter zip
                                    </button>
                                  ) : (
                                    postalCode
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="tw-text-xs sm:tw-text-sm tw-right-auto tw-text-teal-600 tw-font-medium">
                              Edit
                            </div>
                          </>
                        }
                      >
                        <EuiFlexItem className="tw-pt-2">
                          <EuiFormRow
                            fullWidth
                            helpText="No shipping available right now this app is still in development!"
                            label="Address"
                          >
                            <EuiFieldText
                              placeholder="Address"
                              fullWidth
                              className="tw-rounded"
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
                                className="tw-rounded"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </EuiFormRow>
                          </EuiFlexItem>

                          <EuiFlexItem>
                            <EuiFormRow fullWidth label="Country">
                              <EuiFieldText
                                fullWidth
                                className="tw-rounded"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                              />
                            </EuiFormRow>
                          </EuiFlexItem>
                          <EuiFlexItem grow={false}>
                            <EuiFormRow fullWidth label="Postal Code">
                              <EuiFieldText
                                fullWidth
                                className="tw-rounded"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                              />
                            </EuiFormRow>
                            <div className="tw-h-4"></div>
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
                <div className="xl:tw-w-1/2 tw-px-0 sm:tw-mt-6  tw-w-full">
                  <CheckoutSummary cartItems={cartItems} />

                  <div className=" tw-px-4 sm:tw-px-0">
                    <div className="sm:tw-p-4 sm:tw-bg-white sm:tw-shadow sm:tw-rounded tw-mt-2">
                      <EuiButton
                        fullWidth
                        color="secondary"
                        className=" tw-font-semibold "
                        size="m"
                        fill
                        disabled={
                          cartItems.length === 0 ||
                          !address ||
                          !city ||
                          !country ||
                          !postalCode
                        }
                        onClick={submitHandler}
                      >
                        Continue to payment
                      </EuiButton>
                    </div>
                  </div>
                  <br></br>
                  <EuiShowFor sizes={["xs", "s", "m"]}>
                    <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
                  </EuiShowFor>

                  <div className="tw-px-4 sm:tw-px-0">
                    <div className=" tw-text-sm lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                      Your items
                    </div>
                  </div>

                  <EuiShowFor sizes={["xs", "s", "m"]}>
                    <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
                  </EuiShowFor>
                  <div className=" tw-text-2xl tw-font-medium tw-px-4 sm:tw-px-0  tw-pb-2  tw-text-gray-800 tw-mx-auto ">
                    {cartItems &&
                      cartItems.map((item) => <CartItem item={item} />)}
                  </div>
                </div>
              </div>
            </EuiPageBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default ShippingScreen;
