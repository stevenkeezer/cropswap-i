import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import UsersTable from "../components/UsersTable";

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
      <div
        style={{ backgroundColor: "#fafbfd" }}
        className="tw-h-auto tw-antialiased tw-min-h-screen"
      >
        <div className=" ">
          <div className="tw-text-2xl tw-px-4 tw-max-w-screen-xl  tw-pt-8 tw-mx-auto tw-h-screen">
            <div className="tw-p-0  lg:tw-pt-6 tw-pt-2 tw-pb-1 sm:tw-px-0 tw-px-4 tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-xl sm:tw-text-2xl tw-font-semibold ">
              Users
            </div>
            <div className="tw-mt-6 sm:tw-shadow   tw-text-gray-800 ">
              <UsersTable users={users} deleteHandler={deleteHandler} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListScreen;
