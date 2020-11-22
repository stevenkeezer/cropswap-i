import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPage,
} from "@elastic/eui";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dual, setDual] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();

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
          <EuiPage class="tw-min-h-screen  tw-flex tw-flex-col tw-items-center sm:tw-mt-6 tw-mt-2">
            <div className="tw-ml-1">
              <Logo history={history} />
            </div>
            <div class="sm:tw-h-1 tw-h-4 "></div>
            <div className="tw-text-2xl sm:tw-pt-6 tw-mt-5 tw-pb-5 tw-font-bold tw-text-gray-800">
              {cartItems.length > 0 ? "Welcome back" : "Sign in"}
            </div>
            <div class="tw-flex tw-flex-col login-container tw-bg-white tw-px-4 sm:tw-px-6  tw-py-8 tw-rounded-md tw-w-full tw-max-w-lg">
              <div class=" tw-border">
                <EuiForm>
                  <EuiFormRow fullWidth label="">
                    <div class="tw-w-full md:tw-w-full  tw-mb-6">
                      <EuiFieldText
                        type="text"
                        placeholder="Email or username"
                        value={email}
                        fullWidth
                        className="login-form"
                        inputRef={textInput}
                        onChange={(e) => onChange(e)}
                        aria-label="Use aria labels when no actual label is in use"
                      />
                    </div>
                  </EuiFormRow>

                  <div class="tw-w-full md:tw-w-full tw-mb-6 login-password">
                    <EuiFieldPassword
                      placeholder="Password"
                      type={dual ? "dual" : undefined}
                      value={password}
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="Use aria labels when no actual label is in use"
                    />
                  </div>

                  <div class="tw-w-full md:tw-w-full tw-mb-6">
                    <EuiButton
                      color="secondary"
                      // className="tw-bg-teal-500 tw-border-teal-500 tw-text-white tw-font-bold tw-text-sm"
                      disabled={email === "" && password === ""}
                      fullWidth
                      fill
                      onClick={submitHandler}
                    >
                      Log in
                    </EuiButton>
                  </div>
                  <a
                    href="#"
                    target="_blank"
                    class="tw-inline-flex tw-items-center tw-font-bold tw-text-blue-500 hover:tw-text-blue-700 tw-text-xs tw-text-center"
                  >
                    <span class="tw-ml-2 tw-text-base tw-font-medium tw-text-teal-500">
                      Having trouble sigining in? Reset password
                    </span>
                  </a>
                </EuiForm>
              </div>
              <div class="tw-flex tw-justify-center tw-items-center tw-mt-6">
                <a
                  href="#"
                  target="_blank"
                  class="tw-inline-flex tw-items-center tw-font-bold tw-text-blue-500 hover:tw-text-blue-700 tw-text-xs tw-text-center"
                >
                  <span class="tw-ml-2 tw-text-base tw-font-medium tw-text-teal-500">
                    New to cropswap? Sign up
                  </span>
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
