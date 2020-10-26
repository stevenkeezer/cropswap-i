import React from "react";
import { Spinner } from "react-bootstrap";
import { IonLoading } from "@ionic/react";
import { EuiCard, EuiLoadingSpinner } from "@elastic/eui";

const Loader = () => {
  return (
    <IonLoading
      cssClass="my-custom-class"
      isOpen
      name="crescent"
      duration={5000}
    />
  );
};

export default Loader;
