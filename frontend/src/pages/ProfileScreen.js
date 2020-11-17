import {
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiShowFor,
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
import OrderHistoryCard from "../components/OrderHistoryCard";
import Meta from "../components/Meta";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  return (
    <>
      <EuiPage className=" tw-px-0 tw-pt-1  tw-min-h-screen  lg:tw-bg-gray-200 lg:tw-bg-opacity-25">
        <div className="tw-max-w-screen-xl sm:tw-px-12  tw-px-0 tw-mx-auto tw-flex tw-flex-col lg:tw-flex-row tw-w-full">
          <Meta title="My orders" />

          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <div className="tw-p-0    tw-pb-1  tw-tracking-normal tw-text-gray-900 tw-text-base tw-font-semibold ">
                    My orders
                  </div>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            <div className="tw-px-4 sm:tw-px-0 sm:tw-pb-0 ">
              <div className=" tw-mb-3 tw-text-sm tw-flex tw-items-center tw-cursor-pointer hover:tw-text-teal-600 tw-tracking-wide tw-text-gray-800">
                {orders && !loading && orders.length + " Orders"}
              </div>
            </div>
            <OrderHistoryCard orders={orders} history={history} />
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
                      ) : (
                        <div className="tw-bg-transparent sm:tw-p-2 ">
                          <EuiShowFor sizes={["xs"]}>
                            <UserOrderTable orders={orders} history={history} />
                          </EuiShowFor>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </EuiPageContentBody>
          </EuiPageBody>
        </div>
      </EuiPage>
    </>
  );
};

export default ProfileScreen;
