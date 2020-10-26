import {
  EuiFieldPassword,
  EuiFieldText,
  EuiButton,
  EuiForm,
  EuiFormRow,
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
    email = e.targer.value.toLowerCase();
    setEmail(email);
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {/* <FormContainer className="">
        <div className="tw-flex tw-justify-center tw-mt-12">
          <IonImg
            className="tw-shadow tw-border tw-my-1 tw-cursor-pointer tw-mx-8"
            onClick={(e) => {
              history.push("/");
            }}
            style={{
              width: "62px",
              backgroundColor: "#d2d2d2",
              padding: "6px",
              borderRadius: "9999rem",
            }}
            src="https://i.imgur.com/K4SMB4S.png"
          ></IonImg>
        </div>

        <Card className=" tw-max-w-screen-sm  tw-mx-auto  tw-my-6">
          {error && <div>{error}</div>}
          {loading && <div>Loading</div>}
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
          <div style={{ padding: 10, paddingTop: 20 }}>
            <IonButton
              expand="full"
              style={{ margin: 14 }}
              onClick={submitHandler}
            >
              Login
            </IonButton>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              <IonButton
                expand="full"
                style={{ margin: 14 }}
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/register");
                }}
              >
                Create Account
              </IonButton>
            </Link>
          </div>
        </Card>
      </FormContainer> */}
      {userInfo ? (
        <Loader />
      ) : (
        <>
          <div class="tw-text-center tw-mt-12 lg:tw-mt-32">
            <div class="tw-flex tw-items-center tw-justify-center">
              <IonImg
                className="tw-shadow tw-border tw-my-1 tw-mt-10 tw-cursor-pointer tw-mx-8"
                onClick={(e) => {
                  history.push("/");
                }}
                style={{
                  width: "42px",
                  backgroundColor: "#d2d2d2",
                  padding: "6px",
                  borderRadius: "9999rem",
                }}
                src="https://i.imgur.com/K4SMB4S.png"
              ></IonImg>
            </div>

            <span class="tw-text-sm">
              or{" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/register");
                }}
                class="tw-text-blue-500"
              >
                register a new account
              </a>
            </span>
          </div>
          <div class="tw-flex tw-justify-center tw-my-2 tw-mx-4 md:tw-mx-0">
            <div class="tw-w-full tw-max-w-xl tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
              <EuiForm>
                <EuiFormRow fullWidth label="">
                  <div class="tw-w-full md:tw-w-full tw-px-3 tw-mb-6">
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

                <div class="tw-w-full md:tw-w-full tw-px-3 tw-mb-6">
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
                <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-px-3 tw-mb-3 ">
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
                  <div class="tw-w-1/2 tw-text-right">
                    <a
                      href="#"
                      class="tw-text-blue-500 tw-text-sm tw-tracking-tight"
                    >
                      Forget your password?
                    </a>
                  </div>
                </div>
                <div class="tw-w-full md:tw-w-full tw-px-3 tw-mb-6">
                  <EuiButton onClick={submitHandler}>Log in</EuiButton>
                </div>
                <div class="tw-mx-auto tw--mb-6 tw-pb-1">
                  <span class="tw-text-center tw-text-xs tw-text-gray-700">
                    or sign up with
                  </span>
                </div>
              </EuiForm>
              <div class="tw-flex tw-items-center tw-w-full tw-mt-2">
                <div class="tw-w-full md:tw-w-1/3 tw-px-3 tw-pt-4 tw-mx-2 tw-border-t tw-border-gray-400">
                  <button class="tw-appearance-none tw-flex tw-items-center tw-justify-center tw-block tw-w-full tw-bg-gray-100 tw-text-gray-700 tw-shadow tw-border tw-border-gray-500 tw-rounded-lg tw-py-3 tw-px-3 tw-leading-tight hover:tw-bg-gray-200 hover:tw-text-gray-700 focus:tw-outline-none">
                    <svg
                      class="tw-h-6 tw-w-6 tw-fill-current tw-text-gray-700"
                      viewBox="0 0 512 512"
                    >
                      <path d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z" />
                    </svg>
                  </button>
                </div>
                <div class="tw-w-full md:tw-w-1/3 tw-px-3 tw-pt-4 tw-mx-2">
                  <button class="tw-appearance-none tw-flex tw-items-center tw-justify-center tw-block tw-w-full tw-bg-gray-100 tw-text-gray-700 tw-shadow tw-border tw-border-gray-500 tw-rounded-lg tw-py-3 tw-px-3 tw-leading-tight hover:tw-bg-gray-200 hover:tw-text-gray-700 focus:tw-outline-none">
                    <svg
                      class="tw-h-6 tw-w-6 tw-fill-current tw-text-gray-700"
                      viewBox="0 0 512 512"
                    >
                      <path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z" />
                    </svg>
                  </button>
                </div>
                <div class="tw-w-full md:tw-w-1/3 tw-px-3 tw-pt-4 tw-mx-2 tw-border-t tw-border-gray-400">
                  <button
                    aria-disabled="true"
                    class="tw-appearance-none tw-flex tw-items-center tw-justify-center tw-block tw-w-full tw-bg-gray-100 tw-text-gray-700 tw-shadow tw-border tw-border-gray-500 tw-rounded-lg tw-py-3 tw-px-3 tw-leading-tight hover:tw-bg-gray-200 hover:tw-text-gray-700 focus:tw-outline-none"
                  >
                    <svg
                      class="tw-h-6 tw-w-6 tw-fill-current tw-text-gray-700"
                      viewBox="0 0 512 512"
                    >
                      <path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginScreen;
