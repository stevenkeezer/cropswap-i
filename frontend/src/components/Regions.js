import React from "react";
import {
  IonCard,
  IonImg,
  IonCardContent,
  IonLabel,
  IonItemSliding,
  IonItem,
  IonTitle,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItemOptions,
  IonItemOption,
  IonHeader,
} from "@ionic/react";

export default function Regions() {
  return (
    <div className="tw-border-t tw-border-gray-300 tw-pb-32">
      <div className="tw-max-w-screen-xl tw-mx-auto tw-mt-10 tw-text-4xl tw-px-3 tw-text-gray-800 ">
        <IonRow className="tw-max-w-screen-xl tw-mx-auto tw-mt-3  tw-items-baseline ">
          <IonTitle className="tw-p-0 tw-text-2xl tw-font-bold">
            Delivery Regions
          </IonTitle>
        </IonRow>
        <div className="tw-text-lg tw-text-gray-700 tw-pt-3">San Francisco</div>
        <div className="tw-text-lg tw-text-gray-700 tw-pt-3">Santa Rosa</div>
        <div className="tw-text-lg tw-text-gray-700 tw-pt-3">Napa</div>
      </div>
    </div>
  );
}
