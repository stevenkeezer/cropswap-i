import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrderTable from "../components/OrderTable";
import SubFooter from "../components/SubFooter";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="lg:tw-bg-gray-100  lg:tw-mt-24 tw-mt-12  tw-h-auto">
            <div className="tw-max-w-screen-xl tw-mx-auto tw-px-4 tw-mt-4 tw-mb-24">
              <div className="tw-text-gray-800 tw-text-2xl tw-py-4  tw-pt-8 ">
                Order Manager
              </div>
              <div className="xl:tw-shadow xl:tw-rounded-lg tw-mt-2 ">
                <OrderTable orders={orders} history={history} />
              </div>
            </div>
            <SubFooter />
          </div>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
