import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EuiCard, EuiCheckableCard, EuiButton } from "@elastic/eui";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { IonPage, IonContent, IonButton, IonTitle } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import SubFooter from "../components/SubFooter";
import { htmlIdGenerator } from "@elastic/eui/lib/services";

const PlaceOrderScreen = ({ history }) => {
  const [checkbox, setCheckbox] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      // reset card
      // dispatch({ type: ORDER_CREATE_RESET });
    }

    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const checkHandler = () => {
    history.push("/shipping");
  };
  return (
    <>
      <div className="tw-h-auto tw-min-h-screen tw-bg-gray-100 lg:tw-mt-24  tw-mt-12 tw-pt-4">
        <div>
          <div className="tw-max-w-screen-lg tw-mx-auto">
            <CheckoutSteps step1 step2 step3 step4 />
          </div>
          <div className="tw-max-w-screen-xl tw-mt-8 tw-mx-auto tw-px-4">
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <div className="tw-p-0 tw-text-2xl tw-font-medium tw-text-gray-800 tw-pb-6">
                    Shipping Information
                  </div>
                  <Card className="tw-border-none tw-rounded tw-shadow tw-py-2 tw-mb-3">
                    <div className="tw-text-gray-800 tw-font-semibold tw-px-4 tw-py-3">
                      Your items will be shipped to the address listed
                    </div>
                    <ListGroup.Item className="tw-border-none tw-py-4">
                      <EuiCheckableCard
                        className="sm:tw-w-1/2"
                        id={htmlIdGenerator()()}
                        label={
                          <>
                            <div className="tw-flex tw-gap-8 tw-py-2">
                              <div className="tw-font-semibold tw-text-gray-800 tw-pb-0 tw-text-sm">
                                Address:
                              </div>
                              <div className="tw-flex-col">
                                <div className="tw-text-gray-600 tw-text-sm  tw-font-medium">
                                  {cart.shippingAddress.address}
                                </div>
                                <div className="tw-text-gray-600 tw-text-sm  tw-font-medium">
                                  {cart.shippingAddress.city},{" "}
                                  {cart.shippingAddress.postalCode}
                                </div>
                                <div className="tw-text-gray-600 tw-text-sm  tw-font-medium">
                                  {cart.shippingAddress.country}
                                </div>
                              </div>
                            </div>
                          </>
                        }
                        checkableType="checkbox"
                        value="checkbox1"
                        checked={checkbox}
                        onChange={() => {
                          checkHandler();
                          setCheckbox(!checkbox);
                        }}
                      />
                    </ListGroup.Item>
                  </Card>
                  <div className=" tw-text-2xl tw-font-medium tw-text-gray-800 tw-pt-6 tw-pb-6">
                    Payment Method
                  </div>
                  <Card className="tw-border-none tw-rounded tw-shadow tw-py-2 tw-mb-3">
                    <ListGroup.Item className="tw-border-none ">
                      {cart.paymentMethod ? (
                        <div className="tw-font-semibold tw-bg-gray-100 tw-64 tw-shadow-inner tw-rounded-lg tw-px-3 tw-flex tw-items-center tw-gap-2 tw-py-3">
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4="
                            data-v-188c8269=""
                            alt=""
                            aria-label="PayPal"
                            className="paypal-logo paypal-logo-paypal paypal-logo-color-blue tw-h-5"
                          />
                          <span className="tw-pb-0 tw-text-gray-700 tw-text-sm">
                            or Credit Card
                          </span>
                        </div>
                      ) : (
                        <div>No payment method selected</div>
                      )}
                    </ListGroup.Item>
                  </Card>

                  <div className="tw-p-0 tw-text-2xl tw-font-medium tw-text-gray-800 tw-pt-6 lg:tw-pt-6 tw-pb-6">
                    Order Items
                  </div>
                  <Card className="tw-border-none tw-rounded tw-shadow tw-mb-3">
                    <ListGroup.Item className="tw-border-none">
                      {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                      ) : (
                        <ListGroup variant="flush">
                          {cart.cartItems.map((item, index) => (
                            <ListGroup.Item
                              key={index}
                              className="tw-border-none"
                            >
                              <Row>
                                <Col md={1}>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                  />
                                </Col>
                                <Col>
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={4}>
                                  {item.qty} x ${item.price} = $
                                  {item.qty * item.price}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )}
                    </ListGroup.Item>
                  </Card>
                </ListGroup>
              </Col>
              <Col md={4}>
                <div className="tw-p-0 tw-text-2xl tw-font-medium tw-text-gray-800 tw-pb-6 sm:tw-pt-0 tw-pt-6">
                  Order Summary
                </div>
                <Card className="tw-border-none tw-rounded tw-shadow tw-pt-4 tw-px-2">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="tw-border-none">
                      <Row className="tw-items-baseline">
                        <Col className="tw-p-0">Items</Col>
                        <Col className="tw-text-right tw-p-0">
                          ${cart.itemsPrice}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="tw-border-none">
                      <Row className="tw-items-baseline">
                        <Col className="tw-p-0">Shipping</Col>
                        <Col className="tw-text-right tw-p-0">
                          + ${cart.shippingPrice}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="tw-border-none">
                      <Row className="tw-items-baseline">
                        <Col className="tw-p-0">Tax</Col>
                        <Col className="tw-text-right tw-p-0">
                          + ${cart.taxPrice}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="tw-border-none">
                      <Row className="tw-items-baseline">
                        <Col className="tw-p-0 tw-text-sm tw-font-semibold">
                          Sub total
                        </Col>
                        <Col className="tw-text-right tw-font-bold tw-p-0">
                          ${cart.totalPrice}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="tw-border-none">
                      {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>

                <EuiButton
                  fullWidth
                  color="secondary"
                  className="tw-mt-3"
                  size="m"
                  fill
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Continue
                </EuiButton>
                <p className="tw-text-xs tw-pt-2">
                  *You can review this order before it's final
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <SubFooter />
    </>
  );
};

export default PlaceOrderScreen;
