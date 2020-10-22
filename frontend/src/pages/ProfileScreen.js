import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { IonTitle } from "@ionic/react";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import UserOrderTable from "../components/UserOrderTable";
import ElasticCondensed from "../components/ElasticCondensed";
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
            {message && <Message variant="danger">{message}</Message>}
            {}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
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
            )}
          </Col>
          <Col className="tw-p-0 tw-m-0 tw-px-4" md={9}>
            <div className="tw-p-0 tw-mb-4 tw-mt-8 md:tw-mt-0 lg:tw-mb-8 tw-text-gray-800 tw-text-2xl tw-font-semibold ">
              My Orders
            </div>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <div className="xl:tw-shadow-lg xl:tw-rounded-lg">
                <UserOrderTable orders={orders} history={history} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;
