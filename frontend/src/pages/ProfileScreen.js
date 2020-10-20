import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import {
  IonButtons,
  IonButton,
  IonPage,
  IonContent,
  IonTitle,
} from "@ionic/react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className=" tw-bg-gray-100 tw-h-auto">
      <Container>
        <Row className="tw-pt-5">
          <Col md={3}>
            <Card className="tw-inline-block tw-min-w-full  tw-rounded-lg tw-shadow tw-overflow-hidden tw-border-none tw-p-5">
              <h2>User Profile</h2>
              {message && <Message variant="danger">{message}</Message>}
              {}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <IonButton type="submit" variant="primary">
                    Update
                  </IonButton>
                </Form>
              )}
            </Card>
          </Col>
          <Col className="tw-p-0 tw-m-0 tw-px-4" md={9}>
            <IonTitle className="tw-p-0">My Orders</IonTitle>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <table class="tw-w-full tw-flex tw-flex-row tw-flex-no-wrap sm:tw-bg-white tw-rounded-lg tw-overflow-hidden sm:tw-shadow-lg tw-my-5">
                <thead class="tw-text-white ">
                  {orders &&
                    orders.map((order, index) => (
                      <tr
                        key={order._id}
                        class="tw-bg-gray-200 tw-flex tw-flex-col tw-flex-no-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0"
                      >
                        <th class="tw-p-3 sm:tw-text-xs tw-text-left tw-bg-gray-300  lg:tw-border-b-2   tw-border-gray-200 sm:tw-bg-gray-100 tw-text-left  tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          Items
                        </th>

                        <th class="tw-p-3 sm:tw-text-xs tw-text-left tw-bg-gray-300 lg:tw-border-b-2  tw-hidden lg:tw-table-cell tw-border-gray-200 sm:tw-bg-gray-100 tw-text-left  tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          Order Date
                        </th>

                        <th class="tw-p-3 sm:tw-text-xs tw-text-left tw-bg-gray-300  lg:tw-border-b-2  tw-border-gray-200 sm:tw-bg-gray-100 tw-text-left  tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          Paid
                        </th>
                        <th class="tw-p-3 sm:tw-text-xs tw-text-left tw-bg-gray-300  lg:tw-border-b-2 tw-hidden lg:tw-table-cell tw-border-gray-200 sm:tw-bg-gray-100 tw-text-left  tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          Status
                        </th>
                        <th
                          class="tw-p-3 sm:tw-text-xs tw-text-left tw-bg-gray-300  lg:tw-border-b-2 lg:tw-table-cell tw-border-gray-200 sm:tw-bg-gray-100 tw-text-left  tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider "
                          width="110px"
                        >
                          Actions
                        </th>
                      </tr>
                    ))}
                </thead>
                <tbody class="tw-flex-1 sm:tw-flex-none">
                  {orders &&
                    orders.map((order, index) => (
                      <tr
                        key={order._id}
                        class="tw-flex tw-flex-col tw-flex-no tw-no-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0"
                      >
                        <td class=" tw-bg-white tw-border-gray-100 tw-border tw-border-r-0  tw-p-3 ">
                          <div class="tw-flex tw-items-center ">
                            <img
                              class="tw-border-white tw-rounded-full tw-object-cover sm:tw-h-16 sm:tw-w-16 tw-w-6 tw-h-6 sm:tw-rounded tw-relative"
                              key={order.orderItems[0].image}
                              src={order.orderItems[0].image}
                              alt={order.title}
                            />
                            {order.orderItems.length > 1 && (
                              <div
                                class={` tw-h-6 tw-w-6 tw-text-xs lg:tw-flex tw-items-center tw-hidden tw-border-white tw-border tw-font-black tw-ml-12 tw-mt-12 tw-text-orange-100 tw-justify-center tw-absolute  tw-bg-orange-500  tw-rounded-full `}
                              >
                                +{order.orderItems.length - 1}
                              </div>
                            )}
                          </div>
                        </td>
                        <td class=" tw-bg-white tw-border-gray-100 tw-text-gray-600 tw-text-sm tw-border tw-border-l-0 tw-border-r-0  tw-p-3 tw-hidden sm:tw-table-cell truncate">
                          {order.createdAt.substring(0, 10)}
                        </td>

                        <td class=" tw-bg-white tw-border-gray-100 tw-border   tw-border-l-0 tw-border-r-0  tw-p-3 tw-hidden tw-font-medium tw-text-gray-600 hover:tw-text-red-600 hover:tw-font-medium tw-cursor-pointer">
                          ${order.totalPrice}
                        </td>
                        <td class=" tw-bg-white tw-border-gray-100 tw-border  tw-p-3  tw-border-l-0 tw-border-r-0  tw-text-red-400 hover:tw-text-red-600 hover:tw-font-medium tw-cursor-pointer">
                          {order.isPaid ? (
                            <span className=" tw-bg-green-200  tw-px-2 tw-py-1 tw-text-green-900  tw-bg-opacity-50 tw-text-xs tw-rounded-full">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className=" tw-bg-orange-200  tw-px-2 tw-py-1 tw-text-orange-900 tw-text-xs tw-bg-opacity-50 tw-rounded-full">
                              Not Paid
                            </span>
                          )}
                        </td>
                        <td class=" tw-bg-white tw-border-gray-100 tw-border  tw-p-3 tw-hidden  tw-border-l-0 tw-border-r-0  lg:tw-table-cell tw-text-red-400 hover:tw-text-red-600 hover:tw-font-medium tw-cursor-pointer">
                          {order.isDelivered ? (
                            <span className=" tw-bg-green-200 tw-px-2 tw-py-1  tw-text-green-900 tw-text-xs  tw-bg-opacity-50 tw-rounded-full">
                              Delivered on {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className=" tw-bg-orange-200 tw-px-2 tw-py-1  tw-text-orange-900 tw-text-xs tw-bg-opacity-50 tw-rounded-full">
                              Not Delivered
                            </span>
                          )}
                        </td>
                        <td class="tw-bg-white tw-border-gray-100 tw-border  tw-p-3   tw-border-l-0 tw-text-red-400 hover:tw-text-red-600 hover:tw-font-medium tw-cursor-pointer">
                          <span
                            onClick={() => history.push(`/order/${order._id}`)}
                          >
                            <span class=" tw-text-xs tw-text-teal-500 tw-font-semibold hover:tw-bg-teal-600 hover:tw-text-green-100 tw-rounded-lg tw-cursor-pointer tw-text-gray-500">
                              Order details
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;
