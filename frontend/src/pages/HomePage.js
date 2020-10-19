import { Route, Redirect } from "react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TabOnePage from "../pages/TabOnePage";
import TabTwoPage from "../pages/TabTwoPage";
import { listProducts } from "../actions/productActions.js";

import { settings, square, triangle, grid } from "ionicons/icons";

import {
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";

// MOBX
import { observer } from "mobx-react";
import TabOneDetailPage from "./TabOneDetailPage";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";

const HomePage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact={true}>
          <TabOnePage />
        </Route>

        <Route path="/tabs/settings" exact={true}>
          <TabTwoPage />
        </Route>
        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
          <IonIcon icon={grid} />

          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab2" href="/tabs/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default observer(HomePage);
