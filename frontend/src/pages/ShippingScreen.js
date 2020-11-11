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
      <EuiPage className="tw-px-0 tw-bg-white tw-min-h-screen sm:tw-bg-gray-100 sm:tw-bg-opacity-50 ">
        <EuiPageBody component="div">
          <CheckoutSteps step1 step2 />

          <EuiPageContent className="tw-bg-transparent tw-px-0 tw-shadow-none">
            <EuiPageContentBody>
              <div className=" tw-max-w-screen-xl sm:tw-mx-auto tw-flex tw-flex-col xl:tw-flex-row">
                <div className=" tw-w-full">
                  <div className=" tw-text-xl  sm:tw-pt-4 tw-pt-0  tw-pb-3">
                    <div className="tw-p-0  tw-pb-1  tw-tracking-normal tw-pt-2  tw-px-4 tw-text-gray-900 tw-text-xl tw-font-semibold ">
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
                      <div className=" tw-text-sm tw-mt-0 sm:tw-mt-8 lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                        Your address
                      </div>
                    </div>

                    <EuiShowFor sizes={["xs", "s", "m"]}>
                      <EuiHorizontalRule margin="s" />
                    </EuiShowFor>
                    <div className="sm:tw-bg-white tw-py-2 tw-shadow-md sm:tw-shadow tw-px-4 sm:tw-mx-4 sm:tw-pt-2 tw-pb-4  sm:tw-rounded">
                      <EuiAccordion
                        id="accordionExtraWithRightArrow"
                        arrowDisplay="none"
                        paddingSize="none"
                        initialIsOpen={
                          address.length === 0 ||
                          city.length === 0 ||
                          country.length === 0 ||
                          postalCode.length === 0
                        }
                        className="tw-py-2"
                        buttonClassName="focus:tw-outline-none tw-no-underline tw-truncate"
                        buttonContentClassName="tw-flex tw-w-full  tw-justify-between"
                        buttonContent={
                          <>
                            <div className="tw-flex  tw-items-center tw-w-11/12 tw-pb-1 tw-justify-between">
                              <div className="tw-flex tw-mb-2 tw-w-full tw-items-center">
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

                                <div className="tw-truncate  tw-text-sm tw-text-gray-800 tw-w-11/12">
                                  {address === "" ? (
                                    <button className="tw-text-red-500">
                                      Enter address
                                    </button>
                                  ) : (
                                    address
                                  )}
                                  ,{" "}
                                  {city === "" ? (
                                    <button className="tw-text-red-500">
                                      Enter city
                                    </button>
                                  ) : (
                                    city
                                  )}
                                  ,{" "}
                                  {country === "" ? (
                                    <button className="tw-text-red-500">
                                      Enter country
                                    </button>
                                  ) : (
                                    country
                                  )}
                                  ,{" "}
                                  {postalCode === "" ? (
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
                        <EuiFlexItem className="tw-mt-4">
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
                <div className="lg:tw-w-3/5  tw-px-0 sm:tw-px-4 tw-mt-5 lg:tw-mt-0 tw-w-full">
                  <CheckoutSummary cartItems={cartItems} />

                  <div className=" tw-pt-3">
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className=" tw-font-semibold "
                      size="m"
                      fill
                      disabled={
                        cartItems.length === 0 ||
                        address === "" ||
                        city === "" ||
                        country === "" ||
                        postalCode === ""
                      }
                      onClick={submitHandler}
                    >
                      Continue to payment
                    </EuiButton>
                  </div>
                  <br></br>
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
                  <div className=" tw-text-2xl tw-font-medium tw-px-4 sm:tw-px-0  tw-mt-3 tw-pb-2  tw-text-gray-800 tw-mx-auto ">
                    {cartItems &&
                      cartItems.map((item) => <CartItem item={item} />)}
                  </div>
                </div>
              </div>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default ShippingScreen;
