import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";

return (
  <IonPage>
    <IonContent>
      <Container className="ion-padding">{children}</Container>
    </IonContent>
  </IonPage>
);
