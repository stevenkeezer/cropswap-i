import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import {
  basket,
  basketSharp,
  cogOutline,
  cogSharp,
  personCircleSharp,
  personCircleOutline,
  settingsOutline,
  storefront,
  storefrontOutline,
  storefrontSharp,
} from "ionicons/icons";
import ReactTooltip from "react-tooltip";

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
  IonRadio,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonBadge,
  IonActionSheet,
  IonCol,
  IonSelect,
  IonSplitPane,
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
  IonButtons,
  IonButton,
  IonPopover,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonMenu,
  IonCardSubtitle,
  IonCardTitle,
  IonListHeader,
} from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { ellipsisVertical, ellipsisHorizontal } from "ionicons/icons";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions.js";
// MOBX
import { MobXProviderContext, observer } from "mobx-react";
import AddItemModal from "../pages/AddItemModal2";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = ({ addItem }) => {
  const history = useHistory();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [showAdminPopover, setShowAdminPopover] = useState(false);
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    // make it lowercase

    console.log(e);
    // e.preventDefault();
    if (e.trim()) {
      history.push(`/search/${e}`);
    } else {
      history.push("/");
    }
  };

  const { store } = React.useContext(MobXProviderContext);
  const { photos, takePhoto } = usePhotoGallery();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  /**
   *
   */
  const _renderItems = () => {
    return photos.map((photo, index) => {
      return (
        <IonCol
          size="6"
          sizeSm="6"
          sizeXs="12"
          sizeMd="4"
          sizeLg="3"
          sizeXl="2.4"
          className="p-0 m-0"
          width="100%"
        >
          <div style={{ paddingTop: refreshing ? 40 : 0 }}>
            <IonCard>
              <IonItemSliding key={photo.webviewPath}>
                <IonItem
                  className="ion-no-padding"
                  lines="none"
                  style={{
                    paddingTop: "0px !important",
                  }}
                  onClick={(e) => {
                    history.push("/tabs/tab1-detail/" + photo);
                  }}
                >
                  <div className="p-0 ">
                    <IonImg src={photo.webviewPath} />

                    <IonCardContent>
                      <IonLabel text-wrap>
                        <IonText color="primary">
                          <h3>test</h3>
                        </IonText>
                        <p>atest</p>
                        <IonText color="secondary">
                          {/* <p>{value.content.dueDate}</p> */}
                        </IonText>
                      </IonLabel>
                    </IonCardContent>
                  </div>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption
                    // onClick={(e) => _delete(e, value)}
                    color="danger"
                  >
                    Delete
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            </IonCard>
          </div>
        </IonCol>
      );
    });
  };

  const _delete = async (_e, _item) => {
    // close the item
    await _e.target.parentElement.parentElement.closeOpened();
    let result = await store.deleteItem({ id: _item.id });
    if (result) {
      alert("item deleted " + _item.id);
    }
  };

  const _doRefresh = async (event) => {
    console.log("Begin async operation");
    setRefreshing(true);
    await store.loadData();
    setRefreshing(false);
    console.log("Async operation has ended");
  };

  const _renderList = () => {
    return (
      <IonList className="p-0 m-0">
        <IonRefresher onIonRefresh={(e) => _doRefresh(e)}>
          <IonRefresherContent
            style={{ color: "black" }}
            refreshingText="Refreshing..."
            padding
          />
        </IonRefresher>
        <IonGrid className="p-0 m-0">
          <IonRow text-center className="text-center">
            {_renderItems()}
          </IonRow>
        </IonGrid>
      </IonList>
    );
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  // if (!store.activeUser) return null;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  return (
    <IonHeader
      className="ion-no-border"
      style={{ borderBottom: "0.0625rem solid rgb(230, 229, 229)" }}
    >
      <ReactTooltip />
      <IonToolbar
        style={{
          paddingTop: ".225rem",
          maxWidth: "75rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: ".2rem",
        }}
      >
        <div no-padding className="lg:tw-mt-2">
          <Route render={({ history }) => <SearchBox history={history} />} />
          <div
            style={{ color: "rgb(74, 74, 74) !important" }}
            className="tw-gap-4 tw-text-xs  tw-mt-2 tw-px-1 tw-items-center tw-mb-1 lg:tw-flex tw-tracking-wider  tw-hidden"
          >
            <IonText
              onClick={(e) => searchHandler("seasonal")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Seasonal
            </IonText>

            <IonText
              onClick={(e) => searchHandler("tomatoes")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Tomatoes
            </IonText>
            <IonText
              onClick={(e) => searchHandler("vegetables")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Vegetables
            </IonText>
            <IonText
              onClick={(e) => searchHandler("fruits")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Fruits
            </IonText>
            <IonText
              onClick={(e) => searchHandler("soil")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Soil
            </IonText>
            <IonText
              onClick={(e) => searchHandler("squash")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Squash
            </IonText>
            <IonText
              onClick={(e) => searchHandler("compost")}
              className="hover:tw-text-teal-700 tw-cursor-pointer"
            >
              Compost
            </IonText>
            <div
              size="small"
              // color="none"
              // style={{ boxShadow: "none", backgroundColor: "none" }}

              className="tw-bg-teal-600 tw-font-medium tw-tracking-wider hover:tw-bg-teal-500
            tw-rounded-full tw-text-white tw-px-3 tw-shadow-none tw-py-1
            tw-text-xs tw-cursor-pointer"
            >
              <IonText onClick={(e) => history.push("/cart")}>
                Order online
              </IonText>
            </div>
          </div>
        </div>

        <IonButtons slot="start">
          <IonImg
            className="tw-shadow tw-border tw-my-1 tw-cursor-pointer lg:tw-mx-8 tw-mx-4"
            onClick={(e) => {
              history.push("/");
            }}
            style={{
              width: "32px",
              backgroundColor: "#d2d2d2",
              padding: "5px",
              borderRadius: "9999rem",
            }}
            src="https://i.imgur.com/K4SMB4S.png"
          ></IonImg>
        </IonButtons>

        <IonButtons slot="end" className="lg:tw--mt-8">
          {userInfo && userInfo.isAdmin && (
            <>
              <IonPopover
                isOpen={showAdminPopover}
                cssClass="my-custom-class"
                onDidDismiss={(e) => setShowAdminPopover(false)}
              >
                <IonTitle className="tw-px-4 tw-py-2">Administrator</IonTitle>
                <p className="tw-px-4 tw-bg-gray-200  tw-text-xs tw-font-medium tw-mx-4 tw-rounded-lg tw-py-2 tw-my-3 tw-shadow-inner tw-px-3">
                  User: {userInfo.name}
                </p>
                <p className="tw-px-4 tw-bg-gray-200  tw-text-xs tw-font-medium tw-mx-4 tw-rounded-lg tw-py-2 tw-my-3 tw-shadow-inner tw-px-3">
                  Role: Administrator
                </p>
                <div className="tw-p-3 tw-m-0 tw-flex tw-flex-col">
                  <IonButton
                    onClick={() => {
                      history.push("/admin/userlist");
                      setShowAdminPopover(false);
                    }}
                  >
                    <IonText color="">Users</IonText>
                  </IonButton>

                  <IonButton
                    onClick={() => {
                      history.push("/admin/productlist");
                      setShowAdminPopover(false);
                    }}
                  >
                    <IonText color="">Manage Products</IonText>
                  </IonButton>

                  <IonButton
                    onClick={() => {
                      history.push("/admin/orderlist");
                      setShowAdminPopover(false);
                    }}
                  >
                    <IonText color="">Orders</IonText>
                  </IonButton>
                </div>
              </IonPopover>
            </>
          )}

          <IonButton
            data-tip="Farm manager"
            className="tw-pl-3"
            onClick={() => setShowAdminPopover(true)}
          >
            <IonIcon
              className="tw-w-5 tw-h-5"
              color="dark"
              icon={storefrontSharp}
            ></IonIcon>
          </IonButton>

          <IonButton
            size="large"
            className=""
            data-tip="Go to cart"
            data-delay-show="100"
            data-delay-hide="100"
            onClick={() => history.push("/cart")}
          >
            <IonIcon icon={basketSharp} color="dark" style={{ fontSize: 24 }} />
          </IonButton>

          {cartItems.length > 0 && userInfo && (
            <div className="numberCircle">{cartItems.length}</div>
          )}
          {userInfo ? (
            <>
              <IonPopover
                isOpen={showPopover}
                cssClass="my-custom-class"
                onDidDismiss={(e) => setShowPopover(false)}
              >
                <IonList>
                  <IonListHeader>{userInfo.name}</IonListHeader>
                  <div className="tw-p-3 tw-m-0 tw-flex tw-flex-col">
                    <IonButton
                      onClick={() => {
                        history.push("/profile");
                        setShowAdminPopover(false);
                        setShowPopover(false);
                      }}
                    >
                      <IonText color="">My cropswap</IonText>
                    </IonButton>
                    <IonButton onClick={logoutHandler}>
                      <IonText color="">Logout</IonText>
                    </IonButton>
                  </div>
                </IonList>
              </IonPopover>
              <IonButton
                classnName="tw-pl-10"
                onClick={() => setShowPopover(true)}
              >
                {/* {userInfo.name} */}
                <IonIcon
                  color="dark"
                  className="tw-w-6 tw-h-6"
                  icon={personCircleSharp}
                ></IonIcon>
              </IonButton>
            </>
          ) : (
            <IonButton
              className=""
              style={{
                fontSize: ".875rem",
                marginRight: ".9rem",
                fontWeight: "bold",
                padding: "0px 10px 0px",
                color: "white",
                textTransform: "none",
                backgroundColor: "var(--ion-color-primary, #3880ff)",
                borderRadius: 9999,
              }}
              onClick={() => history.push("/login")}
            >
              <IonText color="white">Log in</IonText>
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default observer(Header);
