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
import { trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import NumericInput from "react-numeric-input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CheckoutBottomBar from "../components/CheckoutBottomBar";
import LazyImage from "../components/LazyImage";
import Loader from "../components/Loader";
import Message from "../components/Message";

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
        <Loader />
      ) : (
        <EuiPage
          paddingSize="none"
          className="tw-px-0 sm:tw-px-0 tw-bg-white tw-min-h-screen lg:tw-bg-gray-200 lg:tw-bg-opacity-25"
        >
          <div className="tw-max-w-screen-xl sm:tw-px-4 tw-px-0 tw-mx-auto  tw-w-full">
            <div className="tw-p-0  lg:tw-pt-3 tw-pt-2 tw-pb-1 sm:tw-px-0 tw-px-4 tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-xl tw-font-semibold ">
              Your delivery order
            </div>

            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <div className="tw-px-4 sm:tw-px-0 sm:tw-pb-0 ">
                <div
                  onClick={() => history.push("/")}
                  className="sm:tw-py-2 tw-mb-1 tw-text-sm tw-flex tw-items-center tw-cursor-pointer hover:tw-text-teal-600 tw-tracking-wide tw-text-gray-600"
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
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <div className=" ">
              <div className="sm:tw-px-0 tw-px-4 tw-text-sm lg:tw-py-3 tw-w-full tw-tracking-wide tw-text-gray-700">
                Your items
              </div>
            </div>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>

            <div className="tw-flex tw-gap-6  tw-justify-between  tw-mx-auto xl:tw-flex-row tw-flex-col">
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
                                  className="tw-cursor-pointer tw-text-gray-900 "
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
                                    <div className="tw-ml-3 lg:tw-ml-2">
                                      <div className="tw-text-sm tw-text-gray-700">
                                        Each
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
                  <EuiHorizontalRule margin="none" />
                </EuiShowFor>
                <div className="w-full tw-px-4 tw-border-none tw-shadow-md sm:tw-shadow tw-rounded tw-bg-white ">
                  <div variant="flush" lines="none">
                    <div className="tw-pb-0 tw-mb-3 tw-pt-4 tw-flex tw-justify-between tw-items-baseline">
                      <div className="tw-flex  tw-items-baseline">
                        <div className="tw-font-semibold tw-text-md tw-mr-1">
                          Subtotal
                        </div>
                        <span className="tw-text-gray-900 tw-text-md tw-tracking-wide tw-font-semibold">
                          {" "}
                          ({cartItems.reduce(
                            (acc, item) => acc + item.qty,
                            0
                          )}{" "}
                          item{cartItems.length === 1 ? "" : "s"})
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
                      <div className="tw-flex tw-pb-3 tw-justify-between">
                        <div className="tw-text-sm">Est. tax & fees</div>
                        <div className="tw-text-right tw-text-sm">$0.00</div>
                      </div>
                    </div>
                    <div className="tw-border-none ">
                      <div className="tw-flex tw-justify-between">
                        <div className="tw-text-sm">Delivery fee</div>
                        <div className="tw-text-right tw-text-sm tw-tracking-wide">
                          FREE
                        </div>
                      </div>
                    </div>
                    <EuiHorizontalRule margin="s" />

                    <div lines="none" className="tw-border-none ">
                      <div className="tw-flex  tw-justify-between">
                        <div className="tw-font-bold tw-text-sm tw-text-gray-900">
                          Order total
                        </div>
                        <div className="tw-text-right tw-font-bold tw-text-sm tw-tracking-wide tw-text-gray-900">
                          $
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <EuiHorizontalRule margin="s" />

                    <p class="tw-justify-end tw-flex  tw-text-xs tw-pt-2  tw-pb-4 tw-px-1 tw-text-center tw-tracking-wide tw-text-gray-800 tw-leading-normal ">
                      Taxes (if shown) are estimates. The seller, and not
                      Cropswap, is solely responsible for collecting all
                      applicable taxes.
                    </p>
                  </div>
                </div>

                <EuiShowFor sizes={["xl"]}>
                  <EuiButton
                    fullWidth
                    color="secondary"
                    className="tw-mt-3 tw-font-semibold "
                    size="m"
                    fill
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </EuiButton>
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
