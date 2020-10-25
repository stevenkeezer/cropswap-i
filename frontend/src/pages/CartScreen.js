import { IonButton, IonIcon, IonInput, IonText, IonTitle } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { EuiCard, EuiFlexItem, EuiIcon, EuiFlexGrid } from "@elastic/eui";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import SubFooter from "../components/SubFooter";
import Loader from "../components/Loader";
import { EuiButton, EuiTitle } from "@elastic/eui";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

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
        <div className=" tw-h-auto tw-bg-gray-100 lg:tw-mt-24 tw-mt-12  tw-min-h-screen">
          <div className="tw-max-w-screen-xl tw-mx-auto tw-px-4">
            <div className="tw-p-0 tw-pb-6 tw-pt-6 tw-text-gray-800 tw-text-2xl tw-font-medium ">
              Your pickup order
            </div>

            <div className="tw-flex tw-gap-4 tw-justify-between xl:tw-flex-row tw-flex-col">
              <div className="lg:tw-w-4/5">
                {cartItems.length === 0 ? (
                  <Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                  </Message>
                ) : (
                  <EuiFlexGrid gutterSize="m">
                    {cartItems.map((item) => (
                      <EuiFlexItem style={{ minWidth: "416px" }}>
                        <EuiCard
                          layout="horizontal"
                          icon={
                            <img
                              onClick={() =>
                                history.push(`/product/${item.product}`)
                              }
                              className="tw-h-20 tw-w-20 tw-rounded tw-cursor-pointer tw-relative"
                              alt={item.name}
                              src={item.image}
                            />
                          }
                          iconSize="sm"
                          titleSize="xs"
                          title={
                            <div
                              className="tw-cursor-pointer"
                              onClick={() =>
                                history.push(`/product/${item.product}`)
                              }
                            >
                              {item.name}
                            </div>
                          }
                          description={
                            <div>
                              <div className="tw-font-gray-600 tw-font-medium tw-pb-2 tw-text-sm">
                                ${item.price}
                              </div>
                              {item.countInStock} left in stock
                            </div>
                          }
                        >
                          <>
                            <div className="tw-flex tw-justify-between  ">
                              <Form.Control
                                className="tw-cursor-pointer tw-w-24"
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
                              </Form.Control>
                              <div className="tw-flex-col tw-text-right tw-items-center">
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
                            </div>
                          </>
                        </EuiCard>
                      </EuiFlexItem>
                    ))}
                  </EuiFlexGrid>
                )}
              </div>
              <div>
                <div className=" card tw-rounded tw-border-none tw-shadow tw-mb-2">
                  <div class="card-body">
                    {/* <label className="tw-text-gray-600 tw-font-medium tw-pb-1 tw-text-sm">
                      Have a coupon?
                    </label> */}
                    <div class=" tw-flex tw-items-baseline">
                      <IonInput
                        type="text"
                        class="tw-mt-3 tw-mb-3 tw-mr-3  "
                        name=""
                        placeholder="Discount code"
                      />
                      <div class="">
                        <button
                          disabled
                          class="tw-bg-gray-300 hover:tw-bg-gray-500 tw-cursor-pointer tw-text-gray-800 tw-font-bold tw-py-3 tw-px-4 tw-rounded tw-inline-flex tw-items-center"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <span class="tw-italic tw-text-xs tw-text-gray-600 tw-px-1">
                      No discounts or promotions available at this time
                    </span>
                  </div>
                </div>
                {/* <IonText>
              ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </IonText> */}
                <div className="card tw-border-none tw-shadow tw-rounded  ">
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

                <EuiButton
                  fullWidth
                  color="secondary"
                  className="tw-mt-3"
                  size="m"
                  fill
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </EuiButton>
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
