import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { IonTitle } from "@ionic/react";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import UserOrderTable from "../components/UserOrderTable";
import OrdersEmpty from "../components/OrdersEmpty";
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
      <div style={{ backgroundColor: "#fafbfd" }} className="tw-h-screen">
        <EuiPage restrictWidth="75rem" className="">
          <EuiPageSideBar>
            <Toolbar history={history} profile />
          </EuiPageSideBar>
          {/* The EUI docs site  already has a wrapping <main> tag, so we've changed this example to a <div> for accessibility. You likely don't need to copy the `component` prop for your own usage. */}
          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <div className="tw-p-0  lg:tw-pt-6 tw-pt-2 tw-pb-1  tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-2xl tw-font-semibold ">
                    Orders
                  </div>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            {/* <EuiPageContent
              paddingSize="none"
              panelPaddingSize="none"
              grow={false}
              hasShadow={false}
            > */}
            <EuiPageContentBody>
              {loading ? (
                <Loader />
              ) : (
                <div>
                  <div className="">
                    <div>
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
                        <></>
                      )}
                    </div>
                    <div className="tw-p-0 tw-m-0 ">
                      {loadingOrders ? (
                        <Loader />
                      ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                      ) : orders.length === 0 ? (
                        <OrdersEmpty history={history} />
                      ) : (
                        <div className="md:tw-bg-white sm:tw-p-2 md:tw-rounded md:tw-shadow ">
                          <UserOrderTable orders={orders} history={history} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </EuiPageContentBody>
            {/* </EuiPageContent> */}
          </EuiPageBody>
        </EuiPage>
      </div>
    </>
  );
};

export default ProfileScreen;
