import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <div class="tw-pt-2 tw-max-w-screen-md tw-mx-auto">
        <div class="tw-mx-4 tw-p-4 tw-mb-12">
          <div class="tw-flex tw-items-center">
            <div class="tw-flex tw-items-center tw-text-teal-600 tw-relative">
              <div class="tw-rounded-full tw-transition tw-duration-500 tw-ease-in-out tw-h-12 tw-w-12 tw-py-3 tw-border-2 tw-border-teal-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-bookmark "
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div class="tw-absolute tw-top-0 tw--ml-10 tw-text-center tw-mt-12 tw-pt-2 tw-w-32 tw-text-xs tw-font-medium tw-uppercase tw-text-teal-600">
                {step1 ? (
                  <LinkContainer to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link disabled>Sign In</Nav.Link>
                )}
              </div>
            </div>
            <div class="tw-flex-auto tw-border-t-2 tw-transition tw-duration-500 tw-ease-in-out tw-border-teal-600"></div>
            <div class="tw-flex tw-items-center tw-text-white tw-relative">
              <div
                class={`tw-rounded-full tw-transition tw-duration-500 tw-ease-in-out tw-h-12 tw-w-12 tw-py-3 tw-border-2 ${
                  step3
                    ? "tw-bg-white tw-text-teal-600"
                    : "tw-bg-teal-600 tw-border-teal-600"
                } tw-border-teal-600`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user-plus "
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div class="tw-absolute tw-top-0 tw--ml-10 tw-text-center tw-mt-12 tw-pt-2 tw-w-32 tw-text-xs tw-font-medium tw-uppercase tw-text-teal-600">
                {step2 ? (
                  <LinkContainer to="/shipping">
                    <Nav.Link>Shipping</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link disabled>Shipping</Nav.Link>
                )}
              </div>
            </div>

            {/* <div class="tw-flex-auto tw-border-t-2 tw-transition tw-duration-500 tw-ease-in-out tw-border-teal-600"></div> */}

            {step3 ? (
              <div
                class={`tw-flex-auto tw-border-t-2 tw-transition tw-duration-500 tw-ease-in-out tw-border-teal-600`}
              ></div>
            ) : (
              <div
                class={`tw-flex-auto tw=border-t-2 tw-transition tw-duration-500 tw-ease-in-out  tw-border-gray-300`}
              ></div>
            )}

            <div class="tw-flex tw-items-center tw-text-gray-500 tw-relative">
              <div
                class={`tw-rounded-full tw-transition tw-duration-500 tw-ease-in-out tw-h-12 tw-w-12 tw-py-3 tw-border-2 ${
                  step3
                    ? `tw-border-teal-600  ${
                        !step4 ? `tw-bg-teal-600` : `tw-text-teal-600`
                      } tw-text-white`
                    : "tw-border-gray-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail "
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="tw-absolute tw-top-0 tw--ml-10 tw-text-center tw-mt-12 tw-pt-2 tw-w-32 tw-text-xs tw-font-medium tw-uppercase tw-text-gray-500">
                {step3 ? (
                  <LinkContainer to="/payment">
                    <Nav.Link>Payment</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link disabled>Payment</Nav.Link>
                )}
              </div>
            </div>
            {/* <div class="tw-flex-auto tw=border-t-2 tw-transition tw-duration-500 tw-ease-in-out tw-border-gray-300"></div> */}

            {step4 ? (
              <div
                class={`tw-flex-auto tw-border-t-2 tw-transition tw-duration-500 tw-ease-in-out tw-border-teal-600`}
              ></div>
            ) : (
              <div
                class={`tw-flex-auto tw=border-t-2 tw-transition tw-duration-500 tw-ease-in-out  tw-border-gray-300`}
              ></div>
            )}
            <div class="tw-flex tw-items-center tw-text-gray-500 tw-relative">
              <div
                class={`tw-rounded-full tw-transition tw-duration-500 tw-ease-in-out tw-h-12 tw-w-12 tw-py-3 tw-border-2 tw-border-gray-300 ${
                  step4 && `tw-border-teal-600 tw-bg-teal-600 tw-text-white`
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-database "
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <div class="tw-absolute tw-top-0 tw--ml-10 tw-text-center tw-mt-12 tw-pt-2 tw-w-32 tw-text-xs tw-font-medium tw-uppercase tw-text-gray-500">
                {step4 ? (
                  <LinkContainer to="/placeorder">
                    <Nav.Link>Place Order</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link disabled>Place Order</Nav.Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
