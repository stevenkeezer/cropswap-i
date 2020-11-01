import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { IonTitle } from "@ionic/react";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import UserOrderTable from "../components/UserOrderTable";
import OrdersEmpty from "../components/OrdersEmpty";
import ElasticCondensed from "../components/ElasticCondensed";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Toolbar from "../components/Toolbar";
import { listMyOrders } from "../actions/orderActions";
import SubFooter from "../components/SubFooter";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from "@elastic/eui";

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
    <>
      <div className=" tw-bg-gray-100 tw-h-auto tw-pb-12 tw-antialiased tw-min-h-screen">
        <div className="tw-max-w-screen-xl tw-mx-auto tw-px-4">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <Row className="tw-pt-8">
                <Col md={3}>
                  {message && <Message variant="danger">{message}</Message>}
                  {}
                  {success && (
                    <Message variant="success">Profile Updated</Message>
                  )}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <>
                      <Toolbar history={history} />
                      <ElasticCondensed
                        name={name}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        submitHandler={submitHandler}
                      />
                    </>
                  )}
                </Col>
                <Col className="tw-p-0 tw-m-0 tw-px-4" md={9}>
                  <div className=" tw-text-2xl  tw-pb-8 tw-px-0 tw-mt-0 tw-text-gray-800 tw-font-medium tw-mx-auto ">
                    My Orders
                  </div>

                  {loadingOrders ? (
                    <Loader />
                  ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                  ) : orders.length === 0 ? (
                    <OrdersEmpty history={history} />
                  ) : (
                    <div className="md:tw-shadow  sm:tw-rounded-lg tw-px-2 md:tw-bg-white">
                      <UserOrderTable orders={orders} history={history} />
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
      <SubFooter />
    </>
  );
};

export default ProfileScreen;
