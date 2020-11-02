import {
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrdersEmpty from "../components/OrdersEmpty";
import Toolbar from "../components/Toolbar";
import UserOrderTable from "../components/UserOrderTable";

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
          </EuiPageBody>
        </EuiPage>
      </div>
    </>
  );
};

export default ProfileScreen;
