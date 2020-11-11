import { EuiButton, EuiHorizontalRule, EuiShowFor } from "@elastic/eui";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { NProgress } from "@tanem/react-nprogress";
import Bar from "../components/Bar";
import Container from "../components/Container";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    if (order) {
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  console.log("order", order);

  return loading ? (
    <>
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
      <Loader />
    </>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div
        style={{ backgroundColor: "#fafbfd" }}
        className=" tw-pt-6 tw-antialiased tw-h-auto tw-min-h-screen "
      >
        <div className=" tw-flex tw-flex-col sm:tw-mx-auto lg:tw-flex-row  tw-max-w-screen-xl">
          <div className="tw-p-0 sm:tw-w-2/3 tw-w-full sm:tw-4">
            <ListGroup variant="flush">
              {order.isPaid && (
                <div className="tw-flex tw-justify-between">
                  <div className="tw-p-0 tw-pb-4 tw-text-xl sm:tw-pt-8 tw-px-4  tw-pb-6">
                    Thank you. Your order has been confirmed.{" "}
                    <span className="tw-text-sm"> ID {order._id}</span>
                  </div>
                </div>
              )}

              <div className="tw-p-0  lg:tw-pt-0 tw-pb-4  tw-tracking-normal lg:tw-pt-1 tw-px-4 tw-text-gray-900 tw-text-xl tw-font-semibold ">
                Review your order
              </div>
              <div className="tw-border-none tw-rounded   sm:tw-bg-white sm:tw-shadow tw-mb-3 sm:tw-mx-4 tw-pb-6">
                <div className="tw-border-none">
                  <p className="tw-py-1  tw-pt-3 tw-font-semibold tw-px-4 tw-text-gray-800 tw-text-sm">
                    Personal Details
                  </p>
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

                  <p className="tw-py-3 tw-pt-4 tw-font-semibold tw-px-4 tw-text-gray-800 tw-text-sm">
                    Shipping Address
                  </p>
                  <div className="tw-flex tw-gap-8 tw-px-4 tw-mb-4">
                    <p>
                      <div className="tw-col">
                        <div className="tw-text-gray-600 tw-text-sm tw-py-1 tw-font-medium">
                          {order.shippingAddress.address}
                        </div>
                        <div className="tw-text-gray-600 tw-text-sm tw-py-1 tw-font-medium">
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.postalCode}
                        </div>
                        <div className="tw-text-gray-600 tw-text-sm tw-py-1 tw-font-medium">
                          {order.shippingAddress.country}
                        </div>
                      </div>
                    </p>
                  </div>
                  <div className="tw-px-5">
                    {order.isDelivered ? (
                      <Message variant="success">
                        Delivered on {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </div>
                </div>
              </div>

              <div className="tw-p-0  lg:tw-pt-0 tw-pb-4  tw-tracking-normal lg:tw-pt-1 tw-px-4 tw-text-gray-900 tw-text-xl tw-font-semibold ">
                Payment Information
              </div>
              <div className="tw-border-none tw-rounded tw-shadow tw-pb-3 sm:tw-mx-4 tw-px-4 tw-mb-3 ">
                <ListGroup.Item className="tw-border-none tw-pb-6">
                  <p>
                    {order.paymentMethod && (
                      <span className="tw-font-semibold  tw-flex tw-items-center tw-gap-2 tw-py-3">
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
                      </span>
                    )}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
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

              <div className="tw-border-none tw-rounded tw-px-4 tw-mb-3 ">
                <div className="tw-border-none sm:tw-bg-transparent">
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <div variant="flush">
                      {order &&
                        order.orderItems.map((item, index) => (
                          <CartItem item={item} />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </ListGroup>
          </div>
          <div className="tw-w-full sm:tw-1/3 tw-p-0 sm:tw-px-4">
            <div className="w-full tw-px-4 tw-border-none tw-mt-10 tw-shadow-md sm:tw-shadow tw-rounded card ">
              <div variant="flush" lines="none">
                <div className="tw-pb-0 tw-pt-6 tw-mb-3  tw-flex tw-justify-between tw-items-baseline">
                  <div className="tw-flex  tw-items-baseline">
                    <div className="tw-font-semibold tw-text-md tw-mr-1">
                      Subtotal
                    </div>
                    <span className="tw-text-gray-900 tw-text-md tw-tracking-wide tw-font-semibold">
                      {" "}
                      (
                      {order.orderItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}{" "}
                      item
                      {order.length === 1 ? "" : "s"})
                    </span>
                  </div>

                  <div className="tw-font-semibold tw-text-md tw-tracking-wide">
                    ${order.itemsPrice}
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
                      ${order.shippingPrice}
                    </Col>
                  </Row>
                </div>
                <EuiHorizontalRule margin="s" />

                <div lines="none" className="tw-border-none tw-mb-4 ">
                  <Row>
                    <Col className="tw-font-bold tw-text-sm tw-text-gray-900">
                      Order total
                    </Col>
                    <Col className="tw-text-right tw-font-bold tw-text-sm tw-tracking-wide tw-text-gray-900">
                      ${order.totalPrice}
                    </Col>
                  </Row>
                </div>

                <EuiShowFor sizes={["xs", "s", "m"]}>
                  <EuiHorizontalRule margin="s" />
                </EuiShowFor>
                {order.isPaid && (
                  <EuiButton
                    fullWidth
                    color="none"
                    className="tw-mt-3 tw-bg-gray-300 tw-text-gray-800 "
                    size="m"
                    fill
                    onClick={() => history.push("/")}
                  >
                    Continue Shopping
                  </EuiButton>
                )}
                {!order.isPaid && (
                  <div>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
                {loadingDeliver && <Loader />}

                <p class="tw-justify-end tw-flex mb-3 sm:tw-px-4 tw-px-5 tw-text-xs tw-text-center tw-tracking-wide tw-text-gray-800 tw-leading-normal tw-pt-3">
                  Taxes (if shown) are estimates. The seller, and not Cropswap,
                  is solely responsible for collecting all applicable taxes.
                </p>
              </div>
            </div>

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <>
                  <div className="tw-px-4 tw-text-sm lg:tw-text-2xl  tw-pb-6 tw-mt-8 tw-px-0 tw-mt-0 tw-text-gray-800 tw-font-medium tw-mx-auto ">
                    Complete Order
                  </div>
                  <ListGroup.Item>
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className="tw-mt-3"
                      size="m"
                      fill
                      onClick={deliverHandler}
                    >
                      Mark As Delivered{" "}
                    </EuiButton>
                  </ListGroup.Item>
                  <br></br>
                  <br></br>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
