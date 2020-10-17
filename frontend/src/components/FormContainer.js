import React from "react";
import { useHistory } from "react-router";
import { Container } from "react-bootstrap";

import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonText,
  IonImg,
  IonPage,
  IonContent,
} from "@ionic/react";

export default function FormContainer({ children }) {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <Container className="ion-padding">{children}</Container>
      </IonContent>
    </IonPage>
  );
}
