import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiShowFor,
} from "@elastic/eui";
import { IonIcon } from "@ionic/react";
import { NProgress } from "@tanem/react-nprogress";

import { trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import NumericInput from "react-numeric-input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CheckoutBottomBar from "../components/CheckoutBottomBar";
import CheckoutSummary from "../components/CheckoutSummary";
import LazyImage from "../components/LazyImage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Container from "../components/Container";
import Bar from "../components/Bar";

const CartScreen = ({ match, location, history }) => {
  const [value, setValue] = useState("");

  const productId = match.params.id;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, loading } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push("/cart");
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {loading ? (
        <NProgress isAnimating={loading}>
          {({ animationDuration, isFinished, progress }) => (
            <Container
              animationDuration={animationDuration}
              isFinished={isFinished}
            >
              <Bar animationDuration={animationDuration} progress={progress} />
            </Container>
          )}
        </NProgress>
      ) : (
        <EuiPage
          paddingSize="none"
          className="tw-px-0 sm:tw-px-0 tw-pb-32 sm:tw-pb-0  tw-min-h-screen tw-bg-white lg:tw-bg-gray-200 lg:tw-bg-opacity-25"
        >
          <div className="tw-max-w-screen-xl sm:tw-px-4 tw-px-0 tw-mx-auto  tw-w-full">
            <div className="tw-p-0  lg:tw-pt-3 tw-pb-1 sm:tw-px-0 tw-px-4 tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-xl tw-font-semibold ">
              Your delivery order
            </div>

            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
            </EuiShowFor>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <div className="tw-px-4 sm:tw-px-0 sm:tw-pb-0 ">
                <div
                  onClick={() => history.push("/")}
                  className="lg:tw-py-2 tw-mb-1 tw-text-sm tw-flex tw-items-center tw-cursor-pointer hover:tw-text-teal-600 tw-tracking-wide tw-text-gray-600"
                >
                  Continue shopping{" "}
                  <svg
                    class="tw-w-5 tw-h-5 tw-text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </EuiShowFor>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
            </EuiShowFor>

            <div className=" ">
              <div className="sm:tw-px-0 tw-px-4 tw-text-sm lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                Your items
              </div>
            </div>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
            </EuiShowFor>

            <div className="tw-flex tw-gap-6 lg:tw-gap-8  tw-justify-between  tw-mx-auto xl:tw-flex-row tw-flex-col">
              <div className="tw-w-full">
                {cartItems && cartItems.length === 0 ? (
                  <Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                  </Message>
                ) : (
                  <EuiFlexGroup gutterSize="s" direction="column">
                    {cartItems &&
                      cartItems.map((item) => (
                        <EuiFlexItem>
                          <EuiCard
                            layout="horizontal"
                            className="tw-border-none tw-rounded "
                            iconSize="sm"
                            grow
                            titleSize="xs"
                            title={
                              <div className="tw-flex  tw-items-center tw-justify-between">
                                <div
                                  className="tw-cursor-pointer tw-tracking-wide tw-text-gray-900 "
                                  onClick={() =>
                                    history.push(`/product/${item.product}`)
                                  }
                                >
                                  {item.name}
                                </div>
                                <div>
                                  <IonIcon
                                    className="tw-h-6 tw-w-6 tw-text-gray-600 hover:tw-text-gray-800"
                                    onClick={() =>
                                      removeFromCartHandler(item.product)
                                    }
                                    icon={trashOutline}
                                  ></IonIcon>
                                </div>
                              </div>
                            }
                          >
                            <>
                              <div className="tw-flex  tw-items-center tw-w-full  tw-justify-between">
                                <div className="tw-w-24">
                                  <LazyImage
                                    onClick={() =>
                                      history.push(`/product/${item.product}`)
                                    }
                                    placeholder={item.image}
                                    alt={item.name}
                                    src={item.image}
                                    shadow={false}
                                    height={75}
                                  />
                                </div>
                                <div className="tw-flex tw-w-full ">
                                  <div className="tw-flex tw-mt-auto tw-w-full tw-items-baseline tw-justify-between">
                                    <div className="tw-ml-3 lg:tw-ml-3">
                                      <div className="tw-text-sm sm:tw-pb-1 tw-text-gray-700">
                                        each
                                      </div>
                                      <div className=" tw-text-sm tw-tracking-wider tw-text-gray-900 tw-font-semibold tw-pb-2 tw-pt-1">
                                        ${item.price}
                                      </div>
                                      <div className="tw-flex tw-w-32 tw-h-8">
                                        <NumericInput
                                          mobile
                                          className="numericInput tw-w-32 tw-h-8 tw-bg-gray-200 tw-text-sm tw-border-none tw-bg-opacity-75"
                                          min={1}
                                          onKeyDown={(e) => e.preventDefault()}
                                          max={item.countInStock}
                                          value={item.qty}
                                          onChange={(e) =>
                                            dispatch(addToCart(item.product, e))
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className=" tw-ml-auto tw-mt-auto">
                                      <div className="tw-text-gray-900 text-right tw-font-medium tw-tracking-wide tw-text-sm">
                                        ${(item.price * item.qty).toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          </EuiCard>
                        </EuiFlexItem>
                      ))}
                  </EuiFlexGroup>
                )}
              </div>
              <div className="xl:tw-w-1/2">
                <EuiShowFor sizes={["xs", "s", "m"]}>
                  <EuiHorizontalRule
                    margin="no ne"
                    className="tw-bg-gray-200"
                  />
                </EuiShowFor>
                <CheckoutSummary cartItems={cartItems} />
                <EuiShowFor sizes={["xl"]}>
                  <div className="tw-p-4 tw-bg-white tw-shadow tw-rounded tw-mt-2">
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className="tw-font-semibold  "
                      size="m"
                      fill
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to checkout
                    </EuiButton>
                  </div>
                </EuiShowFor>
                <EuiShowFor sizes={["xs", "s", "m", "l"]}>
                  <CheckoutBottomBar>
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className="tw-mt-3 md:tw-mt-0 tw-font-semibold "
                      size="m"
                      fill
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to checkout
                    </EuiButton>
                  </CheckoutBottomBar>
                </EuiShowFor>
              </div>
            </div>
          </div>
        </EuiPage>
      )}
    </>
  );
};

export default CartScreen;
