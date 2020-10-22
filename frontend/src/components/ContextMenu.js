import React, { useState } from "react";
import {
  personCircleSharp,
  personCircleOutline,
  storefrontSharp,
} from "ionicons/icons";
import AdminButton from "../components/AdminButton";

import { IonItem, IonIcon, IonButton } from "@ionic/react";
import {
  EuiButton,
  EuiContextMenu,
  EuiFormRow,
  EuiIcon,
  EuiPopover,
  EuiSwitch,
  EuiSpacer,
} from "@elastic/eui";

const ContextMenu = ({ userInfo, history, logoutHandler }) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const panels = [
    {
      id: 0,
      // title: userInfo.name,
      items: [
        {
          name: "My cropswap",
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            history.push("/profile");
            closePopover();
          },
        },
        {
          name: "Logout",
          icon: "user",
          target: "_blank",
          onClick: () => {
            logoutHandler();
            closePopover();
          },
        },
        {
          name: "Nest panels",
          icon: "user",
          panel: 1,
        },
        {
          name: "Github",
          icon: "user",
          target: "_blank",
          href: "https://github.com/stevenkeezer/cropswap-i",
          toolTipContent: "See project on Github",
          toolTipPosition: "right",
          onClick: () => {
            closePopover();
          },
        },
        {
          name: "Disabled option",
          icon: "user",
          toolTipContent: "For reasons, this item is disabled",
          toolTipPosition: "right",
          disabled: true,
          onClick: () => {
            logoutHandler();
            closePopover();
          },
        },
      ],
    },
    {
      id: 1,
      title: "Nest panels",
      items: [
        {
          name: "PDF reports",
          icon: "user",
          onClick: () => {
            closePopover();
          },
        },
        {
          name: "Embed code",
          icon: "user",
          panel: 2,
        },
        {
          name: "Permalinks",
          icon: "user",
          onClick: () => {
            closePopover();
          },
        },
      ],
    },
    {
      id: 2,
      title: "Embed code",
      content: (
        <div style={{ padding: 16 }}>
          <EuiFormRow label="Generate a public snapshot?" hasChildLabel={false}>
            <EuiSwitch
              name="switch"
              id="asdf"
              label="Snapshot data"
              checked={true}
              onChange={() => {}}
            />
          </EuiFormRow>
          <EuiFormRow
            label="Include the following in the embed"
            hasChildLabel={false}
          >
            <EuiSwitch
              name="switch"
              id="asdf2"
              label="Current time range"
              checked={true}
              onChange={() => {}}
            />
          </EuiFormRow>
          <EuiSpacer />
          <EuiButton fill>Copy iFrame code</EuiButton>
        </div>
      ),
    },
  ];

  const button = (
    <IonButton onClick={onButtonClick}>
      <IonIcon
        color="dark"
        className="tw-w-6 tw-h-6"
        icon={personCircleSharp}
      ></IonIcon>
    </IonButton>
  );

  return (
    <EuiPopover
      id="contextMenuExample"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downRight"
    >
      <EuiContextMenu initialPanelId={0} panels={panels} />
    </EuiPopover>
  );
};

export default ContextMenu;
