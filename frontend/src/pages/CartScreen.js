import React, { useEffect, useState } from "react";
import { IonButton, IonIcon, IonInput, IonText, IonTitle } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import {
  EuiCard,
  EuiFlexItem,
  EuiIcon,
  EuiFlexGrid,
  EuiFieldText,
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
        <div className=" tw-h-auto  lg:tw-mt-24 tw-mt-12  tw-min-h-screen">
          <div className="tw-max-w-screen-xl tw-mx-auto tw-pt-1 ">
            <div className="tw-p-0 tw-pb-3  tw-pt-16  lg:tw-pt-1 tw-px-4 tw-text-gray-800 sm:tw-text-2xl tw-text-xl tw-font-semibold ">
              Your delivery order
            </div>

            <div className="tw-flex sm:tw-px-4 tw-justify-between xl:tw-flex-row tw-flex-col">
              <div className="lg:tw-w-3/5">
                {cartItems.length === 0 ? (
                  <Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                  </Message>
                ) : (
                  <EuiFlexGrid gutterSize="">
                    {cartItems.map((item) => (
                      <EuiFlexItem>
                        <EuiCard
                          layout="horizontal"
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
                                className="tw-cursor-pointer"
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
                          description={<div></div>}
                        >
                          <>
                            <div className="tw-flex  tw-items-baseline tw-justify-between">
                              <div>
                                <img
                                  onClick={() =>
                                    history.push(`/product/${item.product}`)
                                  }
                                  className="lg:tw-h-32 lg:tw-w-32   lg:tw-hidden tw-w-24 tw-h-24 tw-object-cover lg:tw-rounded tw-cursor-pointer "
                                  alt={item.name}
                                  src={item.image}
                                />
                              </div>

                              <select
                                className="tw-cursor-pointer tw-bg-gray-200 tw-px-4 tw-mt-10  tw-ml-4 tw-py-2 tw-rounded-lg   tw-w-24"
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
                              <div className="tw-font-gray-600 text-right tw-font-medium tw-pb-2 tw-w-56 tw-text-sm">
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
              <div className="lg:tw-w-2/5">
                {/* <IonText>
              ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </IonText> */}

                <div className="w-full tw-border-none tw-shadow tw-rounded  ">
                  <ListGroup variant="flush" lines="none">
                    <div className="b tw-pb-2 tw-mb-3 tw-p-5">
                      <IonText className="tw-font-semibold ">Subtotal</IonText>
                      <span className="tw-text-gray-800 tw-text-lg  tw-font-semibold">
                        {" "}
                        ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        items
                      </span>
                    </div>

                    <ListGroup.Item className="tw-border-none ">
                      <Row className="">
                        <Col>Total price:</Col>
                        <Col className="tw-text-right">
                          $
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="tw-border-none ">
                      <Row className="">
                        <Col>Discount:</Col>
                        <Col className="tw-text-right">+ $0.00</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item lines="none" className="tw-border-none">
                      <Row>
                        <Col className="tw-font-bold tw-text-gray-800">
                          Total:
                        </Col>
                        <Col className="tw-text-right tw-font-bold tw-text-gray-800">
                          $
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <p class="tw-justify-end tw-flex mb-3 tw-px-5 tw-pt-3">
                      <img
                        src="/images/payments.png"
                        height="22"
                        className="tw-h-6"
                      />
                    </p>
                  </ListGroup>
                </div>
                <EuiShowFor sizes={["xl"]}>
                  <EuiButton
                    fullWidth
                    color="secondary"
                    className="tw-mt-3 tw-font-semibold"
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
                      className="tw-mt-3 tw-font-semibold"
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
      <SubFooter />
    </>
  );
};

export default CartScreen;
