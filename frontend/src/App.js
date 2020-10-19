import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "./store";

import {
  IonApp,
  IonRouterOutlet,
  IonLoading,
  IonContent,
  IonFooter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import UserListScreen from "./pages/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { observer, MobXProviderContext } from "mobx-react";

const PublicRoutes = () => {
  return (
    <>
      <IonReactRouter>
        <Header></Header>
        <IonContent>
          {/* <IonRouterOutlet> */}
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
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
          {/* </IonRouterOutlet> */}
        </IonContent>
      </IonReactRouter>
    </>
  );
};

const App = () => {
  return !store ? (
    <IonApp>
      <IonLoading message="Starting App..." />
    </IonApp>
  ) : (
    <IonApp>
      <PublicRoutes />
    </IonApp>
  );
};

export default observer(App);
