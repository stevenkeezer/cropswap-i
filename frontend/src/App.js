import React, { useEffect, useState } from "react";
import { EuiPortal, EuiProgress } from "@elastic/eui";
import { IonApp, IonContent, IonLoading } from "@ionic/react";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { observer } from "mobx-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./pages/CartScreen";
import Loader from "./components/Loader";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import OrderListScreen from "./pages/OrderListScreen";
import OrderScreen from "./pages/OrderScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import SettingsScreen from "./pages/SettingsScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductScreen from "./pages/ProductScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SellingScreen from "./pages/SellingScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingScreen from "./pages/ShippingScreen";
import UserEditScreen from "./pages/UserEditScreen";
import UserListScreen from "./pages/UserListScreen";
import ScrollToTop from "./components/ScrollToTop";
import store from "./store";
import { set } from "mongoose";

const PublicRoutes = ({ history }) => {
  return (
    <>
      <Router>
        <Header></Header>
        {/* <IonRouterOutlet> */}

        <IonContent>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/selling" component={SellingScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/register" component={RegisterScreen} exact={true} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </IonContent>

        {/* </IonRouterOutlet> */}
      </Router>
    </>
  );
};

const App = () => {
  return !store ? (
    <IonApp>
      <Loader message="Starting App..." />
    </IonApp>
  ) : (
    <IonApp>
      <PublicRoutes />
    </IonApp>
  );
};

export default observer(App);
