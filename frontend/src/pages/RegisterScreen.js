import { IonButton, IonInput, IonItem, IonLabel, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

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
      <form>
        Interested in selling your farm goods direct to customers?
        <IonText color="danger" padding style={{ fontWeight: "500" }}>
          {/* {initializationError && initializationError.message} */}
          Sign up
        </IonText>
        {message && <div>{message}</div>}
        {error && <div>{error}</div>}
        {loading && <div>Loading</div>}
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            type="name"
            onIonChange={(e) => {
              setName(e.detail.value);
            }}
            name="name"
            // value="test@test.com"
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
            // value="test@test.com"
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
        {/* <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errorInfo.errMsg}
          duration={2000}
        /> */}
      </form>
    </>
  );
};

export default RegisterScreen;
