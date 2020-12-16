import { IonButton, IonInput, IonItem, IonLabel, IonText } from "@ionic/react";
import React, { useEffect, useState, useRef } from "react";
import {
  EuiButton,
  EuiFieldPassword,
  EuiHorizontalRule,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPage,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/Logo";

import Message from "../components/Message";

import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch(null);
  const [dual, setDual] = useState(true);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const textInput = useRef(null);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch register
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  console.log("err", { error });
  return (
    <>
      <EuiPage class="tw-min-h-screen  tw-flex tw-flex-col tw-items-center sm:tw-mt-6 tw-mt-2">
        <div className="tw-ml-1">
          <Logo history={history} />
        </div>
        <div class="sm:tw-h-1 tw-h-4 "></div>
        <div className="tw-text-2xl sm:tw-pt-6 tw-mt-5 sm:tw-pb-5 tw-font-bold tw-text-gray-800">
          Register
        </div>
        <div class="tw-flex tw-flex-col login-container tw-bg-white tw-px-4 sm:tw-px-6  lg:tw-py-8  tw-py-5 tw-rounded-md tw-w-full sm:tw-max-w-lg">
          <div class=" tw-border">
            <EuiForm>
              <EuiFormRow fullWidth label="">
                <div class="tw-w-full md:tw-w-full  tw-mb-6">
                  <EuiFieldText
                    type="text"
                    placeholder="Name"
                    value={email}
                    fullWidth
                    className="login-form"
                    inputRef={textInput}
                    onChange={(e) => setName(e)}
                    aria-label="Use aria labels when no actual label is in use"
                  />
                </div>
              </EuiFormRow>
              <EuiFormRow fullWidth label="">
                <div class="tw-w-full md:tw-w-full  tw-mb-6">
                  <EuiFieldText
                    type="text"
                    placeholder="Email"
                    value={email}
                    fullWidth
                    className="login-form"
                    inputRef={textInput}
                    onChange={(e) => setEmail(e)}
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
              <div class="tw-w-full md:tw-w-full tw-mb-6 login-password">
                <EuiFieldPassword
                  placeholder="Confirm password"
                  type={dual ? "dual" : undefined}
                  value={password}
                  fullWidth
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-label="Use aria labels when no actual label is in use"
                />
              </div>
              <div class="tw-w-full md:tw-w-full tw-mb-6">
                <EuiButton
                  color="secondary"
                  // className="tw-bg-teal-500 tw-border-teal-500 tw-text-white tw-font-bold tw-text-sm"
                  isDisabled={email === "" && password === ""}
                  fullWidth
                  fill
                  onClick={submitHandler}
                >
                  Register
                </EuiButton>
              </div>
              <div className="tw-flex  tw-py-3 tw-justify-center">
                <a
                  href="#"
                  target="_blank"
                  class="tw-inline-flex  tw-items-center tw-font-bold tw-text-blue-500 hover:tw-text-blue-700 tw-text-xs"
                >
                  <span class="tw-ml-2 tw-text-base tw-font-medium tw-text-teal-500">
                    Having trouble accessing your account? Click Here
                  </span>
                </a>
              </div>

              <div class="separator-container">
                <span class="separator left"></span>
                <span className="tw-px-4 tw-tracking-wide tw-text-gray-900 tw-text-sm">
                  or
                </span>
                <span class="separator right"></span>
              </div>
            </EuiForm>
          </div>
          <div class="tw-w-full   sm:tw-mb-0">
            <button
              disabled
              style={{ borderRadius: 4 }}
              class="tw-w-full tw-bg-blue-800 hover:tw-bg-blue-900  tw-text-white tw-font-bold tw-py-2 sm:tw-py-3 tw-px-4 tw-cursor-not-allowed focus:tw-outline-none focus:tw-shadow-outline"
              type="button"
            >
              Continue with Facebook
            </button>
          </div>
          <div class="tw-w-full sm:tw-mt-3 tw-mt-2 ">
            <button
              disabled
              style={{ borderRadius: 4 }}
              class="tw-w-full tw-bg-blue-600 tw-text-white    tw-font-bold tw-py-2 sm:tw-py-3 tw-px-4 tw-cursor-not-allowed focus:tw-outline-none focus:tw-shadow-outline"
              type="button"
            >
              Continue with Google
            </button>
          </div>
          <div class="tw-w-full sm:tw-mt-3 tw-mt-2">
            <button
              disabled
              style={{ borderRadius: 4 }}
              class="tw-w-full tw-bg-black tw-text-white    tw-font-bold tw-py-2 sm:tw-py-3 tw-px-4 tw-cursor-not-allowed focus:tw-outline-none focus:tw-shadow-outline"
              type="button"
            >
              Continue with Apple
            </button>
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-mt-6">
            <Link
              to="/login"
              class="tw-inline-flex tw-items-center tw-font-bold tw-text-blue-500 hover:tw-text-blue-700 tw-text-xs tw-text-center"
            >
              <span class="tw-ml-2 tw-text-base tw-font-medium tw-text-teal-500">
                Already a memer? Log in
              </span>
            </Link>
          </div>
        </div>
      </EuiPage>
      {/* <form>
        {message && <Message>{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <div>Loading</div>}
        <IonItem>
          Interested in selling your farm goods direct to customers?
          <IonText color="danger" padding style={{ fontWeight: "500" }}>

            Sign up
          </IonText>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            type="name"
            onIonChange={(e) => {
              setName(e.detail.value);
            }}
            name="name"

          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            onIonChange={(e) => {
              setEmail(e.detail.value);
            }}
            name="email"

          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e) => {
              setPassword(e.detail.value);
            }}
            name="password"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e) => {
              setConfirmPassword(e.detail.value);
            }}
            name="confirm password"
          />
        </IonItem>
        <div style={{ padding: 10, paddingTop: 20 }}>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <IonButton expand="full" style={{ margin: 14 }}>
              Have an account?{" "}
            </IonButton>
          </Link>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            Register{" "}
          </IonButton>
        </div>
    
      </form> */}
    </>
  );
};

export default RegisterScreen;
