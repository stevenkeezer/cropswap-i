import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, location, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  console.log("err", { error });
  return (
    <>
      <IonButton onClick={() => history.push("/admin/userlist")}>
        Go back
      </IonButton>
      <div>
        {loadingUpdate && <div>loading..</div>}
        {errorUpdate && <div>{errorUpdate}</div>}

        <IonText color="danger" padding style={{ fontWeight: "500" }}>
          {/* {initializationError && initializationError.message} */}
          Edit user
        </IonText>

        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="name"
                onIonChange={(e) => {
                  setName(e.detail.value);
                }}
                name="name"
                placeholder={name}
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
                placeholder={email}
                name="email"
                // value="test@test.com"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Is Admin</IonLabel>
              <IonCheckbox
                type="checkbox"
                onIonChange={(e) => {
                  setIsAdmin(e.detail.checked);
                }}
                // IonLabel="Is Admin"
                checked={isAdmin}
              />
            </IonItem>

            <div style={{ padding: 10, paddingTop: 20 }}>
              <IonButton
                expand="full"
                style={{ margin: 14 }}
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                Update{" "}
              </IonButton>
            </div>
            {/* <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errorInfo.errMsg}
          duration={2000}
        /> */}
          </>
        )}
      </div>
    </>
  );
};

export default UserEditScreen;
