import React, { useEffect, useState } from "react";
import { IonButton, IonIcon, IonInput, IonText, IonTitle } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import {
  EuiCard,
  EuiFlexItem,
  EuiIcon,
  EuiFlexGrid,
  EuiFieldText,
  EuiHorizontalRule,
  EuiToolTip,
  EuiPopover,
  EuiSelect,
  EuiShowFor,
  EuiButtonIcon,
  EuiFieldNumber,
} from "@elastic/eui";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import SubFooter from "../components/SubFooter";
import Loader from "../components/Loader";
import { EuiButton, EuiTitle } from "@elastic/eui";
import CheckoutBottomBar from "../components/CheckoutBottomBar";

const CartScreen = ({ match, location, history }) => {
  const [value, setValue] = useState("");
  const [isCompressed, setCompressed] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isReadOnly, setReadOnly] = useState(false);

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
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" tw-h-auto  lg:tw-mt-24 tw-mt-12 sm:tw-bg-gray-100 tw-min-h-screen">
          <div className="tw-max-w-screen-xl  tw-mx-auto tw-pt-1 ">
            <div className="tw-p-0  lg:tw-pt-8 tw-pt-16  tw-tracking-wide lg:tw-pt-1 tw-px-4 tw-text-gray-900 sm:tw-text-2xl tw-text-xl tw-font-semibold ">
              Your delivery order
            </div>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <EuiHorizontalRule margin="s" />
            </EuiShowFor>
            <div className="tw-px-4">
              <div
                onClick={() => history.push("/")}
                className="sm:tw-py-3 tw-text-sm tw-flex tw-items-center tw-cursor-pointer hover:tw-text-teal-600 tw-tracking-wide tw-text-gray-600"
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

            <div className="tw-flex sm:tw-px-4 tw-gap-6  tw-justify-between tw-max-w-screen-xl tw-mx-auto xl:tw-flex-row tw-flex-col">
              <div className="lg:tw-w-2/3">
                {cartItems.length === 0 ? (
                  <Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                  </Message>
                ) : (
                  <EuiFlexGrid gutterSize="s">
                    {cartItems.map((item) => (
                      <EuiFlexItem className="tw-flex tw-flex-grow">
                        <EuiCard
                          layout="horizontal"
                          className="tw-border-none tw-shadow"
                          icon={
                            <img
                              onClick={() =>
                                history.push(`/product/${item.product}`)
                              }
                              className="lg:tw-h-32 lg:tw-w-32 tw-hidden lg:tw-flex  tw-object-cover lg:tw-rounded tw-cursor-pointer tw-relative"
                              alt={item.name}
                              src={item.image}
                            />
                          }
                          iconSize="sm"
                          titleSize="xs"
                          title={
                            <div className="tw-flex  tw-items-center tw-justify-between">
                              <div
                                className="tw-cursor-pointer "
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
                            <div className="tw-flex  tw-items-baseline   tw-justify-between">
                              <div className="tw-gap-4 tw-flex">
                                <img
                                  onClick={() =>
                                    history.push(`/product/${item.product}`)
                                  }
                                  className="lg:tw-h-32 lg:tw-w-32   lg:tw-hidden tw-w-16 tw-h-16  tw-object-cover lg:tw-rounded tw-cursor-pointer "
                                  alt={item.name}
                                  src={item.image}
                                />
                                <select
                                  className="tw-cursor-pointer tw-bg-gray-200  tw-px-4  tw-mr-auto tw-mt-auto  tw-rounded-lg  tw-h-8  tw-w-24"
                                  as="select"
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>

                              <div className="tw-font-gray-600 text-right tw-font-medium tw-w-56 tw-text-sm">
                                ${item.price}
                              </div>
                            </div>
                          </>
                        </EuiCard>
                      </EuiFlexItem>
                    ))}
                  </EuiFlexGrid>
                )}
              </div>
              <div className="lg:tw-w-1/3">
                {/* <IonText>
              ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </IonText> */}

                <div className="w-full tw-border-none tw-shadow tw-rounded card ">
                  <div variant="flush" lines="none">
                    <div className="tw-pb-0 tw-pt-6 tw-mb-3 tw-p-4 tw-flex tw-justify-between tw-items-baseline">
                      <div className="tw-flex  tw-items-baseline">
                        <div className="tw-font-semibold tw-text-md tw-mr-1">
                          Subtotal
                        </div>
                        <span className="tw-text-gray-900 tw-text-md  tw-font-semibold">
                          {" "}
                          ({cartItems.reduce(
                            (acc, item) => acc + item.qty,
                            0
                          )}{" "}
                          item{cartItems.length === 1 ? "" : "s"})
                        </span>
                      </div>

                      <div className="tw-font-semibold tw-text-md">
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <EuiHorizontalRule margin="s" />

                    <div className="tw-border-none tw-tracking-wide">
                      <Row className="tw-px-4 tw-pb-3">
                        <Col className="tw-text-sm">Est. tax & fees</Col>
                        <Col className="tw-text-right tw-text-sm">$0.00</Col>
                      </Row>
                    </div>
                    <div className="tw-border-none ">
                      <Row className="tw-px-4">
                        <Col className="tw-text-sm">Delivery fee</Col>
                        <Col className="tw-text-right tw-text-sm">$0.00</Col>
                      </Row>
                    </div>
                    <EuiHorizontalRule margin="s" />

                    <div lines="none" className="tw-border-none tw-px-4">
                      <Row>
                        <Col className="tw-font-bold tw-text-sm tw-text-gray-900">
                          Order total
                        </Col>
                        <Col className="tw-text-right tw-font-bold tw-text-sm tw-text-gray-900">
                          $
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </Col>
                      </Row>
                    </div>
                    <EuiHorizontalRule margin="s" />

                    <p class="tw-justify-end tw-flex mb-3 sm:tw-px-4 tw-px-5 tw-text-xs tw-text-center tw-tracking-wide tw-text-gray-800 tw-leading-normal tw-pt-3">
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
                      className="tw-mt-3 tw-font-semibold "
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
        </div>
      )}
    </>
  );
};

export default CartScreen;
