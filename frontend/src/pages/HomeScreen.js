import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import Meta from "../components/Meta";

import Categories from "../components/Categories";
import Paginate from "../components/Paginate";
import Alert from "../components/Alert";
import HomeHero from "../components/HomeHero";

import Header from "../components/Header";
import { useHistory } from "react-router";
import {
  IonItem,
  IonIcon,
  IonAlert,
  IonError,
  IonContent,
  IonLoading,
  IonTitle,
  IonImg,
  IonGrid,
  IonRow,
  IonActionSheet,
  IonCol,
  IonSelect,
  IonText,
  IonList,
  IonPage,
  IonThumbnail,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButtons,
  IonButton,
  IonPopover,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonListHeader,
} from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { ellipsisVertical, ellipsisHorizontal } from "ionicons/icons";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions.js";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Regions from "../components/Regions";

// MOBX
import { MobXProviderContext, observer } from "mobx-react";
import AddItemModal from "./AddItemModal2";
import { logout } from "../actions/userActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const history = useHistory();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  /**
   *
   */

  const logoutHandler = () => {
    dispatch(logout());
  };
  // if (!store.activeUser) return null;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <IonPage>
      <Meta />
      <IonContent
        padding
        style={
          {
            // "--background": "#EAEDED",
          }
        }
      >
        {!keyword ? (
          <>
            <Alert></Alert>
            <Carousel />
            {/* <IonRow className="tw-max-w-screen-xl tw-mx-auto tw-mt-3 tw-px-3 tw-items-baseline tw-mt-10"> */}
            {/* <IonTitle className="tw-p-0 tw-pb-2">Categories</IonTitle> */}

            {/* <IonText className="tw-border tw-px-4 tw-py-2 tw-text-gray-600 hover:tw-bg-teal-500 hover:tw-text-white  tw-font-medium tw-text-sm tw-rounded">
                View all
              </IonText> */}
            {/* </IonRow> */}
            <Categories />
            <div
              style={{
                borderBottom: "0.0625rem solid rgb(204, 204, 204)",
                maxWidth: "73rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: ".9rem",
              }}
            ></div>
          </>
        ) : (
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        )}
        <IonRow className="tw-max-w-screen-xl tw-mx-auto tw-mb-3 tw-px-3 tw-items-baseline tw-mt-8">
          <IonTitle className="tw-p-0">Featured Products</IonTitle>
          <IonText className="tw-border tw-border-gray-400 tw-px-4 tw-py-2 tw-text-gray-800 hover:tw-bg-teal-500 hover:tw-text-white  tw-font-medium tw-text-sm tw-rounded">
            View all
          </IonText>
        </IonRow>

        {loading ? (
          <IonLoading
            cssClass="my-custom-class"
            isOpen={loading}
            name="crescent"
            onDidDismiss={() => loading}
            duration={5000}
          />
        ) : error ? (
          <IonAlert
            isOpen={error}
            // onDidDismiss={() => setShowAlert1(false)}
            cssClass="my-custom-class"
            header={"Alert"}
            subHeader={"Subtitle"}
            message={"This is an alert message."}
            buttons={["OK"]}
          />
        ) : (
          <>
            <IonRow className="tw-max-w-screen-xl tw-mx-auto  tw-px-1">
              {products.map((product) => (
                <IonCol
                  size="6"
                  sizeSm="6"
                  sizeXs="12"
                  sizeMd="4"
                  sizeLg="3"
                  sizeXl="2.4"
                  className="p-0 m-0"
                  width="100%"
                  key={product.name}
                >
                  <Product product={product} history={history} />
                </IonCol>
              ))}
              <Paginate
                className="tw-mx-auto"
                pages={pages && pages}
                page={page && page}
                keyword={keyword ? keyword : ""}
              />
            </IonRow>
            {/* <HomeHero /> */}
            <Regions />

            <Footer />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default observer(HomeScreen);
