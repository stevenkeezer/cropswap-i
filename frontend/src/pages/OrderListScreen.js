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
          <div
            style={{ backgroundColor: "#fafbfd" }}
            className="tw-antialiased  tw-pb-12 tw-h-auto tw-min-h-screen"
          >
            <div className="tw-max-w-screen-xl tw-mx-auto tw-px-4 tw-pt-4 ">
              <div className="tw-p-0  lg:tw-pt-6 tw-pt-2 tw-pb-1 sm:tw-px-0 tw-px-4 tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-xl sm:tw-text-2xl tw-font-semibold ">
                Orders
              </div>
              <div className="xl:tw-shadow xl:tw-rounded-lg tw-mt-2 ">
                <OrderTable orders={orders} history={history} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
