import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea,
  IonGrid,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonActionSheet,
  IonRow,
  IonCol,
  IonFooter,
  IonDatetime,
} from "@ionic/react";
import { camera, trash, close } from "ionicons/icons";
import { CameraResultType, CameraSource } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera";
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const AddItemModal2 = ({ showModal, onDidDismiss }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [item, setItem] = useState({
    title: "",
    content: "",
    date: "",
    location: "",
    picture: "",
  });

  const { getPhoto } = useCamera();
  const { photos, takePhoto } = usePhotoGallery();

  console.log(photos, takePhoto, "ERRR");
  return (
    <IonModal isOpen={showModal} onDidDismiss={() => onDidDismiss()}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent padding>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        <p>This is modal content</p>
        <IonItem>
          <IonLabel position="stacked">Subject</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => setSubject(e.detail.value)}
            name="subject"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Email *Your email will be encrpyted
          </IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => setSubject(e.detail.value)}
            name="subject"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Due Date</IonLabel>
          <IonDatetime
            display-format="MMM DD, YYYY"
            onIonChange={(e) => setDueDate(e.detail.value)}
            name="dueDate"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Summary</IonLabel>
          <IonTextarea
            rows={6}
            onIonChange={(e) => setBody(e.detail.value)}
            name="body"
          />
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="full"
                  onClick={() => {
                    let returnValues = {
                      dueDate,
                      body,
                      subject,
                    };
                    onDidDismiss({ result: returnValues });
                    setDueDate("");
                    setBody("");
                    setSubject("");
                  }}
                >
                  Save
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  expand="full"
                  onClick={() => {
                    setDueDate("");
                    setBody("");
                    setSubject("");
                    onDidDismiss();
                  }}
                >
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default AddItemModal2;
