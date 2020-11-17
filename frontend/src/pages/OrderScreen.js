import {
  EuiButton,
  EuiHorizontalRule,
  EuiShowFor,
  EuiPage,
} from "@elastic/eui";
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
      <EuiPage className="tw-px-0 sm:tw-pt-6 tw-pt-0 tw-tracking-wide tw-text-gray-800 tw-antialiased tw-h-auto tw-min-h-screen ">
        <div
          className={` tw-flex sm:tw-mx-auto  tw-w-full  ${
            !order.isPaid
              ? "tw-max-w-screen-xl xl:tw-flex-row tw-flex-col "
              : "tw-max-w-screen-lg tw-flex-col  md:tw-px-20"
          }`}
        >
          <div
            className={`tw-p-0 ${
              !order.isPaid ? "tw-w-full" : "tw-w-full"
            }  sm:tw-px-1`}
          >
            <ListGroup variant="flush">
              <div className="tw-border-none tw-rounded  tw-bg-white sm:tw-shadow tw-mb-3 sm:tw-mx-4 tw-mx-0">
                {order.isPaid && (
                  <>
                    <div className="tw-flex tw-justify-between tw-p-4">
                      <div className="tw-text-base ">
                        Order
                        <span> #{order._id}</span>
                        <div className="tw-text-xs tw-mt-2">
                          Placed {order.createdAt}
                        </div>
                      </div>
                      <div>
                        <EuiButton
                          className="tw-bg-teal-500 tw-text-sm tw-px-2 tw-font-bold tw-border-teal-500"
                          fill
                          color="secondary"
                          onClick={() => history.push("/")}
                        >
                          Return to menu
                        </EuiButton>
                      </div>
                    </div>

                    <EuiHorizontalRule
                      margin="none"
                      className="tw-bg-gray-200"
                    />
                  </>
                )}

                <div className="tw-p-4">
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="warning">Not delivered</Message>
                  )}
                </div>
              </div>

              <div className="tw-pb-3 tw-text-opacity-75 tw-pt-4 tw-px-4 tw-text-gray-600 tw-tracking-wider tw-text-sm tw-text-opacity-75 tw-uppercase">
                Customer Info
              </div>
              <EuiShowFor sizes={["xs"]}>
                <EuiHorizontalRule margin="none" className="tw-bg-gray-200" />
              </EuiShowFor>
              <div className="tw-border-none tw-pt-1 tw-rounded tw-shadow tw-pb-3 tw-bg-white sm:tw-mx-4 tw-mb-3 tw-mx-0 ">
                <p className="tw-py-1 tw-pt-4 tw-font-normal tw-px-4  tw-text-gray-600 tw-text-xs">
                  Delivery address
                </p>
                <div className="tw-flex tw-gap-8 tw-px-4 tw-mb-4">
                  <div className="tw-text-gray-900  tw-text-sm tw-py-1 tw-font-normal">
                    {order.shippingAddress.address} {order.shippingAddress.city}
                    , {order.shippingAddress.state},{" "}
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.country}
                  </div>
                </div>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />

                <p className="tw-py-1 tw-pt-2 tw-font-normal tw-px-4 tw-text-gray-600 tw-text-xs">
                  Full name
                </p>
                <EuiShowFor sizes={["xs", "s", "m"]}>
                  <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
                </EuiShowFor>
                <div className="tw-flex tw-px-4 tw-pb-3">
                  <div className="tw-text-gray-900  tw-text-sm tw-py-1 tw-font-normal">
                    {userInfo.name}
                  </div>
                </div>

                <div className="tw-border-none tw-py-2  tw-px-4 ">
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </div>
              </div>

              <EuiShowFor sizes={["xs"]}>
                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
              </EuiShowFor>

              <div className="tw-pb-3 tw-text-opacity-75 tw-pt-4 sm:tw-pt-4 tw-px-4 tw-text-gray-600 tw-tracking-wider tw-text-sm tw-text-opacity-75 tw-uppercase">
                Your items
              </div>

              <EuiShowFor sizes={["xs"]}>
                <EuiHorizontalRule margin="none" className="tw-bg-gray-200" />
              </EuiShowFor>

              <EuiShowFor sizes={["xl"]}>
                <div className="tw-border-none tw-px-4 sm:tw-bg-transparent">
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
              </EuiShowFor>
            </ListGroup>
          </div>
          <div
            className={`tw-p-0 sm:tw-px-5 ${
              !order.isPaid ? "xl:tw-w-1/2" : "tw-w-full"
            }`}
          >
            <div className="tw-w-full tw-border-none tw-shadow-md sm:tw-shadow tw-rounded tw-bg-white ">
              <div className="tw-pb-4">
                <div className="tw-pb-0  tw-mb-3  tw-px-4   tw-flex tw-justify-between tw-items-baseline">
                  <div className="tw-flex tw-mt-2  tw-items-baseline">
                    <div className="tw-font-semibold tw-py-1 tw-pt-3 tw-text-md tw-mr-1">
                      Subtotal
                    </div>
                  </div>

                  <div className="tw-font-semibold tw-text-md tw-tracking-wide">
                    ${order.itemsPrice}
                  </div>
                </div>

                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
                <EuiShowFor sizes={["xs", "s", "m", "l"]}>
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
                </EuiShowFor>
                <EuiShowFor sizes={["xs", "s", "m", "l"]}>
                  <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
                </EuiShowFor>

                <div className="tw-px-4 tw-flex tw-items-center tw-justify-between tw-pb-3">
                  <div className="tw-text-sm">Est. tax & fees</div>
                  <div className="tw-text-right tw-text-sm">
                    ${order.taxPrice}
                  </div>
                </div>

                <div className="tw-px-4 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-text-sm">Delivery fee</div>
                  <div className="tw-text-right tw-text-sm tw-tracking-wide">
                    {order.shippingPrice === 0
                      ? "FREE"
                      : "$" + order.shippingPrice}
                  </div>
                </div>

                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />

                <div className="tw-flex tw-items-center tw-mb-4 tw-px-4 tw-justify-between">
                  <div className="tw-font-bold tw-text-sm tw-text-gray-900">
                    Order total
                  </div>
                  <div className="tw-text-right tw-font-bold tw-text-sm tw-tracking-wide tw-text-gray-900">
                    ${order.totalPrice}
                  </div>
                </div>

                <EuiHorizontalRule margin="s" className="tw-bg-gray-200" />
                <p class="tw-justify-center tw-flex tw-mb-3 sm:tw-px-4 tw-px-5 tw-text-center tw-text-xs tw-tracking-wide tw-text-gray-800 tw-leading-normal tw-pt-3">
                  Taxes (if shown) are estimates. The seller, and not Cropswap,
                  is solely responsible for collecting all applicable taxes.
                </p>

                {order.isPaid && (
                  <div className="tw-mx-4">
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className="tw-font-medium tw-text-sm"
                      size="m"
                      fill
                      onClick={() => history.push("/")}
                    >
                      Return to menu
                    </EuiButton>
                  </div>
                )}
                {!order.isPaid && (
                  <div className="tw-mx-4">
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
              </div>
            </div>

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <>
                  <div className="tw-px-4 sm:tw-px-0 tw-pb-10 sm:tw-pb-0 ">
                    <div className="tw-pb-3 tw-text-opacity-75 tw-pt-6 tw-text-gray-600 tw-tracking-wider tw-text-sm tw-text-opacity-75 tw-uppercase">
                      Complete Order
                    </div>
                    <EuiButton
                      fullWidth
                      color="secondary"
                      size="m"
                      className="tw-font-medium tw-text-sm"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered{" "}
                    </EuiButton>
                  </div>
                  <br></br>
                  <br></br>
                </>
              )}
          </div>
        </div>
      </EuiPage>
    </>
  );
};

export default OrderScreen;
