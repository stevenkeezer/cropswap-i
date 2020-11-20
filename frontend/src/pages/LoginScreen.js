import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiFieldPassword,
  EuiFieldText,
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiTitle,
} from "@elastic/eui";
import { IonButton, IonImg } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dual, setDual] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email.toLowerCase(), password));
  };

  return (
    <>
      {userInfo ? (
        <Loader />
      ) : (
        <>
          <EuiPage class="tw-min-h-screen  tw-flex tw-flex-col tw-items-center tw-mt-10 ">
            <div class="tw-flex tw-flex-col tw-bg-white tw-shadow-md tw-px-4 sm:tw-px-6 md:tw-px-8 lg:tw-px-10 tw-py-8 tw-rounded-md tw-w-full tw-max-w-md">
              <div class="tw-font-medium tw-self-center tw-text-xl sm:tw-text-2xl tw-uppercase tw-text-gray-800">
                Login To Your Account
              </div>
              <button
                aria-disabled="true"
                class="tw-relative tw-mt-6 tw-border tw-rounded-md tw-py-2 tw-text-sm tw-text-gray-800 tw-bg-gray-100 hover:tw-bg-gray-200"
              >
                <span class="tw-absolute tw-left-0 tw-top-0 tw-flex tw-items-center tw-justify-center tw-h-full tw-w-10 tw-text-blue-500">
                  <i class="fab fa-facebook-f"></i>
                </span>
                <span>Login with Facebook</span>
              </button>
              <div class="tw-relative tw-mt-10 tw-h-px tw-bg-gray-300">
                <div class="tw-absolute tw-left-0 tw-top-0 tw-flex tw-justify-center tw-w-full tw--mt-2">
                  <span class="tw-bg-white tw-px-4 tw-text-xs tw-text-gray-500 tw-uppercase">
                    Or Login With Email
                  </span>
                </div>
              </div>
              <div class="tw-mt-10">
                <EuiForm>
                  <EuiFormRow fullWidth label="">
                    <div class="tw-w-full md:tw-w-full  tw-mb-6">
                      <label
                        class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2"
                        for="Password"
                      >
                        Email address
                      </label>

                      <EuiFieldText
                        type="text"
                        placeholder="Email"
                        value={email}
                        fullWidth
                        onChange={(e) => onChange(e)}
                        aria-label="Use aria labels when no actual label is in use"
                      />
                    </div>
                  </EuiFormRow>

                  <div class="tw-w-full md:tw-w-full tw-mb-6">
                    <label
                      class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2"
                      for="Password"
                    >
                      Password
                    </label>

                    <EuiFieldPassword
                      placeholder="Placeholder text"
                      type={dual ? "dual" : undefined}
                      value={password}
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="Use aria labels when no actual label is in use"
                    />
                  </div>
                  <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-3 ">
                    <label
                      for="remember"
                      class="tw-flex tw-items-center tw-w-1/2"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        class="tw-mr-1 tw-bg-white tw-shadow"
                      />
                      <span class="tw-text-sm tw-text-gray-700 tw-pt-1">
                        Remember Me
                      </span>
                    </label>
                  </div>
                  <div class="tw-w-full md:tw-w-full tw-mb-6">
                    <EuiButton fullWidth onClick={submitHandler}>
                      Log in
                    </EuiButton>
                  </div>
                </EuiForm>
              </div>
              <div class="tw-flex tw-justify-center tw-items-center tw-mt-6">
                <a
                  href="#"
                  target="_blank"
                  class="tw-inline-flex tw-items-center tw-font-bold tw-text-blue-500 hover:tw-text-blue-700 tw-text-xs tw-text-center"
                >
                  <span>
                    <svg
                      class="tw-h-6 tw-w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </span>
                  <span class="tw-ml-2">You don't have an account?</span>
                </a>
              </div>
            </div>
          </EuiPage>
          {/* <EuiPage className="tw-h-screen">
            <EuiPageBody component="div">
              <EuiPageContent horizontalPosition="center" className="tw-mt-10">
                <EuiPageContentBody>
                  <div class="tw-w-full  ">
                    <EuiForm>
                      <EuiFormRow fullWidth label="">
                        <div class="tw-w-full md:tw-w-full  tw-mb-6">
                          <label
                            class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2"
                            for="Password"
                          >
                            Email address
                          </label>

                          <EuiFieldText
                            type="text"
                            placeholder="Email"
                            value={email}
                            fullWidth
                            onChange={(e) => onChange(e)}
                            aria-label="Use aria labels when no actual label is in use"
                          />
                        </div>
                      </EuiFormRow>

                      <div class="tw-w-full md:tw-w-full tw-mb-6">
                        <label
                          class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2"
                          for="Password"
                        >
                          Password
                        </label>

                        <EuiFieldPassword
                          placeholder="Placeholder text"
                          type={dual ? "dual" : undefined}
                          value={password}
                          fullWidth
                          onChange={(e) => setPassword(e.target.value)}
                          aria-label="Use aria labels when no actual label is in use"
                        />
                      </div>
                      <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-3 ">
                        <label
                          for="remember"
                          class="tw-flex tw-items-center tw-w-1/2"
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            class="tw-mr-1 tw-bg-white tw-shadow"
                          />
                          <span class="tw-text-sm tw-text-gray-700 tw-pt-1">
                            Remember Me
                          </span>
                        </label>
                      </div>
                      <div class="tw-w-full md:tw-w-full tw-mb-6">
                        <EuiButton fullWidth onClick={submitHandler}>
                          Log in
                        </EuiButton>
                      </div>
                    </EuiForm>
                  </div>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
      
       */}
        </>
      )}
    </>
  );
};

export default LoginScreen;
