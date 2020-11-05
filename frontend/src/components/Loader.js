import { IonLoading } from "@ionic/react";
import React from "react";

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
