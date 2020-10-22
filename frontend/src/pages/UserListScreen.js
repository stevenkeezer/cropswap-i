import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import UsersTable from "../components/UsersTable";
import {
  checkmarkOutline,
  trashOutline,
  createOutline,
  closeOutline,
} from "ionicons/icons";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <div className="tw-px-4 lg:tw-bg-gray-100 tw-h-screen ">
        <div className="tw-text-2xl tw-font-semibold tw-max-w-screen-xl tw-pt-8 tw-mx-auto">
          Users
          <div className="tw-mt-4  lg:tw-shadow  tw-text-gray-800 ">
            <UsersTable users={users} deleteHandler={deleteHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListScreen;
