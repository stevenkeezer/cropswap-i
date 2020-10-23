import React, { useState } from "react";

import {
  EuiButton,
  EuiContextMenu,
  EuiIcon,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import { constructSharp } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/react";

// import EuiTabsExample from "../tabs/tabbed_content";

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach((item) => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

const AdminMenu = ({ history }) => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [isDynamicPopoverOpen, setDynamicPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onDynamicButtonClick = () => {
    setDynamicPopover(!isDynamicPopoverOpen);
  };

  const closeDynamicPopover = () => {
    setDynamicPopover(false);
  };

  const createPanelTree = (Content) => {
    return flattenPanelTree({
      id: 0,
      title: "Admin options",
      items: [
        {
          name: "Users List",
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            history.push("/admin/userlist");
            closePopover();
          },
        },
        {
          isSeparator: true,
          key: "sep",
        },
        {
          name: "Manage Products",
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            history.push("/admin/productlist");
            closePopover();
          },
        },
        {
          isSeparator: true,
          key: "sep",
        },
        {
          name: "Manage Orders",
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            history.push("/admin/orderlist");
            closePopover();
          },
        },
        {
          name: "See more",
          icon: "plusInCircle",
          panel: {
            id: 1,
            width: 400,
            title: "See more",
            content: <Content />,
          },
        },
      ],
    });
  };

  const panels = createPanelTree(() => (
    <EuiText style={{ padding: 24 }} textAlign="center">
      <p>
        <EuiIcon type="faceHappy" size="xxl" />
      </p>

      <h3>Context panels can contain anything</h3>
      <p>
        You can stuff just about anything into these panels. Be mindful of size
        though. This panel is set to 400px and the height will grow as space
        allows.
      </p>
    </EuiText>
  ));

  //   const dynamicPanels = createPanelTree(EuiTabsExample);

  const button = (
    <IonButton onClick={onButtonClick}>
      <IonIcon className="tw-w-5 tw-h-5" icon={constructSharp}></IonIcon>
    </IonButton>
  );

  const dynamicButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onDynamicButtonClick}
    >
      Click me to load dynamic mixed content menu
    </EuiButton>
  );

  return (
    <React.Fragment>
      <EuiPopover
        id="contextMenuNormal"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        anchorPosition="downCenter"
      >
        <EuiContextMenu initialPanelId={0} panels={panels} />
      </EuiPopover>

      <EuiSpacer size="l" />
    </React.Fragment>
  );
};

export default AdminMenu;
