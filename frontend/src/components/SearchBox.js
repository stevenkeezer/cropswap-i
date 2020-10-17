import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
  IonItem,
  IonIcon,
  IonToolbar,
  IonInput,
  IonSearchbar,
  IonFooter,
} from "@ionic/react";
import { search } from "ionicons/icons";

export default function SearchBox({ history }) {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <IonInput
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 5,
          fontSize: 14,
          height: 38,
        }}
        //enter key is sending wrong address
        placeholder="Products, farms, brands, and more"
        value={keyword}
        backgroundColor="dark"
        onIonChange={(e) => {
          setKeyword(e.detail.value);
        }}
      >
        <IonIcon
          style={{
            marginLeft: 10,
            color: "#212121",
            fontSize: "1rem",
            opacity: "50%",
          }}
          icon={search}
        ></IonIcon>
      </IonInput>

      {/* <IonButton type="submit" onClick={submitHandler}>
        Search
      </IonButton> */}
    </form>
  );
}
