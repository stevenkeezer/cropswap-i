import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Toolbar from "../components/Toolbar";

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState(20);
  const [dual, setDual] = useState(true);

  const history = useHistory();

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
      <div style={{ backgroundColor: "#fafbfd" }} className="">
        <EuiPage restrictWidth="75rem" className="">
          <EuiPageSideBar>
            <Toolbar history={history} settings></Toolbar>
          </EuiPageSideBar>
          <EuiPageBody component="div">
            <div>
              {message && <Message variant="danger">{message}</Message>}
              {}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <></>
              )}
            </div>
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <div className="tw-p-0  lg:tw-pt-6 tw-pt-2 tw-pb-1  tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-2xl tw-font-semibold ">
                    Account settings
                  </div>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent>
              <EuiPageContentBody>
                <form class="">
                  <div class="tw-w-full tw-flex tw-flex-col lg:tw-flex-row  tw-mx-auto  tw-max-w-screen-lg">
                    <div class="tw-w-full lg:tw-w-2/5 tw-mb-8 ">
                      <span class="tw-tw-text-4xl tw-font-semibold  ">
                        Basics
                      </span>
                      <p class="tw-w-11/12  tw-pt-3 tw-text-gray-600 tw-text-sm tw-leading-5">
                        Having an up-to-date email address attached to your
                        account is a great way toward improved account security.
                      </p>
                    </div>

                    <div class="tw-w-full lg:tw-w-3/5">
                      <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-px-3">
                          <label
                            class="tw-block tw-tracking-wide tw-text-gray-900 tw-text-sm tw-font-normal tw-mb-6 tw-mt-1"
                            for="grid-password"
                          >
                            Name
                          </label>
                          <EuiFieldText
                            placeholder="Placeholder text"
                            value={value}
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-label="Use aria labels when no actual label is in use"
                          />
                        </div>
                      </div>
                      <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-px-3">
                          <label
                            class="tw-block tw-tracking-wide tw-text-gray-900 tw-text-sm tw-font-normal tw-mb-6"
                            for="grid-password"
                          >
                            Email
                          </label>
                          <EuiFieldText
                            placeholder="Placeholder text"
                            value={value}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            aria-label="Use aria labels when no actual label is in use"
                          />
                          <button class="tw-px-3 tw-py-3 tw-bg-gray-700 tw-mt-5 tw-text-white tw-rounded-lg">
                            Change your password
                          </button>
                        </div>
                      </div>
                      <div class="tw-w-full tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-pt-3 tw-px-3">
                          <label
                            class="tw-block tw-tracking-wide tw-text-gray-900 tw-text-sm tw-font-normal tw-mb-6"
                            for="grid-password"
                          >
                            Password
                          </label>
                          <EuiFieldPassword
                            placeholder="********"
                            // type={dual ? "dual" : undefined}
                            value={password}
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Use aria labels when no actual label is in use"
                          />
                        </div>
                      </div>
                      <div class="tw-w-full tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-px-3">
                          <label
                            class="tw-block tw-tracking-wide tw-text-gray-900 tw-text-sm tw-font-normal tw-mb-6"
                            for="grid-password"
                          >
                            Confirm Password
                          </label>
                          <EuiFieldPassword
                            placeholder="********"
                            type={dual ? "dual" : undefined}
                            value={confirmPassword}
                            fullWidth
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            aria-label="Use aria labels when no actual label is in use"
                          />
                        </div>
                      </div>
                      <div class="md:tw-flex md:tw-items-center">
                        <div class="md:w-1/3"></div>
                        <div class="md:w-2/3"></div>
                      </div>
                    </div>
                  </div>

                  <div class="tw-border tw-mx-auto dark:tw-border-gray-700 tw-transition tw-duration-500 tw-mt-6 tw-mb-6 tw-ease-in-out  tw-max-w-screen-lg"></div>
                  <div class="tw-w-full tw-flex tw-flex-col lg:tw-flex-row  tw-mx-auto  tw-max-w-screen-lg">
                    <div class="sm:tw-w-2/5 ">
                      <span class="tw-tw-text-4xl ">Profile</span>
                      <p class="tw-w-11/12  tw-pt-3 tw-text-gray-600 tw-text-sm tw-leading-5">
                        This information will be shown publicly so be careful
                        what information you provide.
                      </p>
                    </div>

                    <div class="tw-w-3/5">
                      <div class="tw-w-full tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-px-3">
                          <label
                            class="tw-block tw-tracking-wide tw-text-gray-900 tw-text-sm tw-font-normal  tw-mt-1 tw-mb-6"
                            for="grid-password"
                          >
                            First Name{" "}
                          </label>
                          <input
                            class="tw-h-12 tw-appearance-none tw-block tw-w-full tw-bg-white tw-text-gray-700 tw-border tw-border-gray-200 tw-rounded-lg tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white focus:tw-border-gray-500"
                            type="email"
                          />
                        </div>
                      </div>
                      <div class="tw-w-full tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-px-3">
                          <label
                            class="tw-block tw-tracking-wide tw-text-gray-900 tw-text-sm tw-font-normal tw-mb-6"
                            for="grid-password"
                          >
                            Last Name{" "}
                          </label>
                          <input
                            class="tw-h-12 tw-appearance-none tw-block tw-w-full tw-bg-white tw-text-gray-700 tw-border tw-border-gray-200 tw-rounded-lg tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white focus:tw-border-gray-500"
                            type="email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tw-border tw-mx-auto dark:tw-border-gray-700 tw-transition tw-duration-500 tw-mt-6 tw-mb-6 tw-ease-in-out  tw-max-w-screen-lg">
                    <EuiButton
                      fullWidth
                      color="none"
                      className="tw-mt-3 tw-bg-gray-300 tw-text-gray-800 "
                      size="m"
                      fill
                      onClick={submitHandler}
                    >
                      Update
                    </EuiButton>
                  </div>
                </form>
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </div>
    </>
  );
}
