import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import OrderTable from "../components/OrderTable";

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
    <div className="tw-bg-gray-100 lg:tw-mt-24 tw-mt-12">
      <div className="tw-max-w-screen-xl tw-pt-4 tw-px-4 tw-mx-auto">
        <div className="tw-text-gray-800 tw-text-2xl tw-font-semibold tw-py-4">
          Order Manager
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="xl:tw-shadow xl:tw-rounded-lg ">
            <OrderTable orders={orders} history={history} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListScreen;
