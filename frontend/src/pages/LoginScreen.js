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
          <EuiPage className="tw-h-screen tw-mt-12">
            <EuiPageBody component="div">
              <EuiPageContent horizontalPosition="center">
                <EuiPageContentBody>
                  <div class="tw-w-full ">
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
                        <div class="tw-w-1/2 tw-text-right">
                          <a
                            href="#"
                            class="tw-text-blue-500 tw-text-sm tw-tracking-tight"
                          >
                            Forget your password?
                          </a>
                        </div>
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
        </>
      )}
    </>
  );
};

export default LoginScreen;
