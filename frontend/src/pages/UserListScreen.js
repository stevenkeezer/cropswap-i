import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
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
    <div className="tw-bg-gray-100 tw-h-full">
      <div class="tw-container tw-mx-auto tw-px-4 tw-sm:px-8 tw-max-w-screen-xl tw-bg-gray-100">
        <div class="tw-py-2 ">
          <div class="tw-px-4">
            <h2 class="tw-text-2xl tw-font-semibold tw-leading-tight">Users</h2>
          </div>
          <div class="tw-my-2 tw-flex tw-sm:flex-row tw-flex-col tw-px-4">
            <div class="tw-flex tw-flex-row tw-mb-1 tw-sm:mb-0">
              <div class="tw-relative">
                <select class="tw-appearance-none tw-h-full tw-rounded-l tw-border tw-block tw-appearance-none tw-w-full tw-bg-white tw-border-gray-400 tw-text-gray-700 tw-py-2 tw-px-4 tw-pr-8 tw-leading-tight tw-focus:outline-none tw-focus:bg-white tw-focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                  <svg
                    class="fill-current tw-h-4 tw-w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div class="tw-relative">
                <select class="tw-appearance-none tw-h-full tw-rounded-r tw-border-t tw-sm:rounded-r-none tw-sm:border-r-0 tw-border-r tw-border-b tw-block tw-appearance-none tw-w-full tw-bg-white tw-border-gray-400 tw-text-gray-700 tw-py-2 tw-px-4 tw-pr-8 tw-leading-tight tw-focus:outline-none tw-focus:border-l tw-focus:border-r tw-focus:bg-white tw-focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                  <svg
                    class="tw-fill-current tw-h-4 tw-w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div class="tw-block tw-relative">
                <span class="tw-h-full tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    class="tw-h-4 tw-w-4 tw-fill-current tw-text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  class="tw-appearance-none tw-rounded-r tw-rounded-l tw-sm:rounded-l-none tw-border tw-border-gray-400 tw-border-b tw-block tw-pl-8 tw-pr-6 tw-py-2 tw-w-full tw-bg-white tw-text-sm tw-placeholder-gray-400 tw-text-gray-700 tw-focus:bg-white tw-focus:placeholder-gray-600 tw-focus:text-gray-700 tw-focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div class="-tw-mx-4 tw-sm:-mx-8 tw-px-4 tw-sm:px-8 tw-py-4 tw-overflow-x-auto">
            <div class="tw-inline-block tw-min-w-full tw-shadow tw-rounded-lg tw-overflow-hidden">
              <table class="tw-min-w-full tw-leading-normal">
                <thead>
                  <tr>
                    <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                      User
                    </th>
                    <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                      Email
                    </th>
                    <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                      Id
                    </th>
                    <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                      Role
                    </th>
                    <th class="tw-px-5 tw-py-3 tw-border-b-2 tw-border-gray-200 tw-bg-gray-100 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                      Permission
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <fsdfasf></fsdfasf> */}

                  {users &&
                    users.map((user) => (
                      <tr key={user._id}>
                        <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                          <div class="tw-flex tw-items-center">
                            <div class="tw-flex-shrink-0 tw-w-10 tw-h-10">
                              <img
                                class="tw-w-full tw-h-full tw-rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                                alt=""
                              />
                            </div>
                            <div class="tw-ml-3">
                              <p class="tw-text-gray-900 tw-whitespace-no-wrap">
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                          <p class="tw-text-gray-900 tw-whitespace-no-wrap">
                            {user.email}
                          </p>
                        </td>
                        <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                          <p class="tw-text-gray-900 tw-whitespace-no-wrap">
                            {user._id}
                          </p>
                        </td>
                        <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                          <span class="tw-relative tw-inline-block tw-px-3 tw-py-1 tw-font-semibold tw-text-green-900 tw-leading-tight">
                            {user && user.isAdmin ? (
                              <>
                                <span
                                  aria-hidden
                                  class="tw-absolute tw-inset-0 tw-bg-green-200 tw-opacity-50 tw-rounded-full"
                                ></span>
                                <span class="tw-relative">Admin</span>
                              </>
                            ) : (
                              <>
                                <span
                                  aria-hidden
                                  class="tw-absolute tw-inset-0 tw-bg-orange-200  tw-opacity-50 tw-rounded-full"
                                ></span>
                                <span class="tw-relative">User</span>
                              </>
                            )}
                          </span>
                        </td>
                        <td class="tw-px-5 tw-py-5 tw-border-b tw-border-gray-200 tw-bg-white tw-text-sm">
                          <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant="light" className="btn-sm">
                              <IonIcon
                                size="small"
                                icon={createOutline}
                              ></IonIcon>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(user._id)}
                          >
                            <IonIcon size="small" icon={trashOutline}></IonIcon>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div class="tw-px-5 tw-py-5 tw-bg-white tw-border-t tw-flex tw-flex-col tw-xs:flex-row tw-items-center tw-xs:justify-between          ">
                <span class="tw-text-xs tw-xs:text-sm tw-text-gray-900">
                  Showing {users && users.length} Entries
                </span>
                <div class="tw-inline-flex tw-mt-2 tw-xs:mt-0">
                  <button class="tw-text-sm tw-bg-gray-300 tw-hover:bg-gray-400 tw-text-gray-800 tw-font-semibold tw-py-2 tw-px-4 tw-rounded-l">
                    Prev
                  </button>
                  <button class="tw-text-sm tw-bg-gray-300 tw-hover:bg-gray-400 tw-text-gray-800 tw-font-semibold tw-py-2 tw-px-4 tw-rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;
