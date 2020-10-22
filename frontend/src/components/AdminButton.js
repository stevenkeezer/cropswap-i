import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { storefrontSharp } from "ionicons/icons";

import { IonIcon, IonButton } from "@ionic/react";
import { EuiToolTip } from "@elastic/eui";

const AdminButton = () => (
  <div>
    <EuiToolTip position="top" content={<p>Farm Manager</p>}>
      <IonButton onClick={() => console.log("hi")}>
        <IonIcon
          className="tw-w-5 tw-h-5"
          color="dark"
          icon={storefrontSharp}
        ></IonIcon>
      </IonButton>
    </EuiToolTip>
  </div>
);

export default AdminButton;
