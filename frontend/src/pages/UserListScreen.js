import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import UsersTable from "../components/UsersTable";
import SubFooter from "../components/SubFooter";

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
      <div className="tw-h-auto tw-min-h-screen">
        <div className="tw-px-4 lg:tw-bg-gray-100  lg:tw-mt-24 tw-mt-12 ">
          <div className="tw-text-2xl  tw-max-w-screen-xl  tw-pt-8 tw-mx-auto tw-h-screen">
            <div className="tw-font-medium tw-text-gray-800">Users</div>
            <div className="tw-mt-6 sm:tw-shadow   tw-text-gray-800 ">
              <UsersTable users={users} deleteHandler={deleteHandler} />
            </div>
          </div>
        </div>
        <SubFooter />
      </div>
    </>
  );
};

export default UserListScreen;
