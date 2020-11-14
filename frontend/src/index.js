import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { IonReactRouter } from "@ionic/react-router";

import "./my_colors.scss";

import "./index.css";
import "./output.css";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

import * as serviceWorker from "./serviceWorker";

// const store = new Store();

defineCustomElements(window);
ReactDOM.render(
  <Provider store={store}>
    {/* <IonReactRouter> */}
    <App />
    {/* </IonReactRouter> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
