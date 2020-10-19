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
import { IonButtons, IonButton, IonPage, IonContent } from "@ionic/react";
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
    <div className=" tw-pt-3 tw-bg-gray-100 tw-h-screen">
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
          <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <div class="-tw-mx-4 tw-sm:-mx-8 tw-px-4 tw-sm:px-8 tw-py-4 tw-overflow-x-auto">
                <div class="tw-inline-block tw-min-w-full  tw-rounded-lg tw-shadow tw-overflow-hidden">
                  <table
                    striped
                    hover
                    responsive
                    className="tw-min-w-full tw-leading-normal tw-border--none"
                  >
                    <thead>
                      <tr>
                        <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          ID
                        </th>
                        <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          DATE
                        </th>
                        <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          Total
                        </th>
                        <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          PAID
                        </th>
                        <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          DELIVERED
                        </th>
                        <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                            <div class="tw-flex tw-items-center">
                              <div class="tw-ml-3">
                                <p class="tw-text-gray-900 tw-whitespace-no-wrap">
                                  {order._id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                            <p class="tw-text-gray-900 tw-whitespace-no-wrap">
                              {order.createdAt.substring(0, 10)}
                            </p>
                          </td>
                          <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                            <p class="tw-text-gray-900 tw-whitespace-no-wrap">
                              {order.totalPrice}
                            </p>
                          </td>
                          <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                            {order.isPaid ? (
                              <span className=" tw-bg-green-200  tw-px-3 tw-py-1 tw-text-green-900  tw-bg-opacity-50 tw-rounded-full">
                                {order.paidAt.substring(0, 10)}
                              </span>
                            ) : (
                              <span className=" tw-bg-orange-200  tw-px-3 tw-py-1 tw-text-orange-900  tw-bg-opacity-50 tw-rounded-full">
                                Not Paid
                              </span>
                            )}
                          </td>
                          <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                            <td>
                              {order.isDelivered ? (
                                <span className=" tw-bg-green-200  tw-px-3 tw-py-1 tw-text-green-900  tw-bg-opacity-50 tw-rounded-full">
                                  {order.deliveredAt.substring(0, 10)}
                                </span>
                              ) : (
                                <span className=" tw-bg-orange-200  tw-px-3 tw-py-1 tw-text-orange-900  tw-bg-opacity-50 tw-rounded-full">
                                  Not Delivered
                                </span>
                              )}
                            </td>
                          </td>

                          <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className="btn-sm" variant="light">
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;
