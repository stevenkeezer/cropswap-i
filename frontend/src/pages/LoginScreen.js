import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonText,
  IonPage,
  IonContent,
} from "@ionic/react";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

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
      <FormContainer className="">
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
          {/* <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errorInfo.errMsg}
          duration={2000}
        /> */}
        </Card>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
