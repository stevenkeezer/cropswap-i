import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
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
  IonCol,
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
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { receipt, square, triangle } from "ionicons/icons";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions.js";
// MOBX
import { MobXProviderContext, observer } from "mobx-react";
import AddItemModal from "./AddItemModal2";

const TabOnePage = ({ addItem }) => {
  const history = useHistory();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

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

  // if (!store.activeUser) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={(e) => {
                setShowAddItemModal(true);
              }}
            >
              <IonImg
                style={{
                  width: "32px",
                  backgroundColor: "#d2d2d2",
                  padding: "5px",
                  marginLeft: ".36rem",
                  borderRadius: "9999rem",
                }}
                src="https://i.imgur.com/K4SMB4S.png"
              ></IonImg>
            </IonButton>
            <IonTitle>cropswap</IonTitle>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                setShowAddItemModal(true);
              }}
            >
              <IonText color="primary">Add item</IonText>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent padding>
        <AddItemModal
          showModal={showAddItemModal}
          onDidDismiss={(_v) => {
            if (_v) {
              console.log(_v.result);
              store.addItem({ ..._v.result });
            }
            setShowAddItemModal(false);
          }}
        />

        <IonItem lines="none">
          {/* <IonLabel>Current User: {store.activeUser.email}</IonLabel> */}
        </IonItem>
        <IonTitle>Latest Products</IonTitle>
        {loading ? (
          <IonLoading
            cssClass="my-custom-class"
            isOpen={loading}
            onDidDismiss={() => loading}
            message={"Please wait..."}
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
          <IonRow>
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
              >
                <Product product={product} />
              </IonCol>
            ))}
          </IonRow>
        )}
        {/* {_renderList()} */}
      </IonContent>
    </IonPage>
  );
};

export default observer(TabOnePage);
