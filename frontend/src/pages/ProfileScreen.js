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

const ProfileScreen = ({ location, history, setIsCartPopoverOpen }) => {
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
        <div className="tw-max-w-screen-xl sm:tw-px-12  tw-px-4 tw-mx-auto tw-flex tw-flex-col lg:tw-flex-row tw-w-full">
          <Meta title="My orders" />

          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <div className="tw-p-0  sm:tw-pt-4  tw-pb-1  tw-tracking-normal tw-text-gray-900 tw-text-base tw-font-bold ">
                  My orders
                </div>
                <div
                  onClick={() => history.push("/")}
                  className="tw-p-0 tw-pt-4  tw-flex tw-items-center  tw-pb-3 sm:tw-pb-12  tw-tracking-normal tw-text-gray-900 tw-text-base "
                >
                  <svg
                    class="tw-w-6 tw-h-6 tw--ml-2 tw-mr-1 tw-text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Back to shopping
                </div>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            <div className="tw-px-4 sm:tw-px-0 sm:tw-pb-0 ">
              <div className=" tw-mb-3 tw-text-xs tw-flex tw-items-center tw-cursor-pointer hover:tw-text-teal-600 tw-tracking-wide tw-text-gray-800">
                {orders && !loading && orders.length + " Orders"}
              </div>
            </div>
            <OrderHistoryCard
              orders={orders}
              history={history}
              setIsCartPopoverOpen={setIsCartPopoverOpen}
            />
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
                          {/* <EuiShowFor sizes={["xs"]}>
                            <UserOrderTable orders={orders} history={history} />
                          </EuiShowFor> */}
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
