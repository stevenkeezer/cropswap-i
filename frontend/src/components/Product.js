import React from "react";
import {
  IonCard,
  IonImg,
  IonCardContent,
  IonLabel,
  IonItemSliding,
  IonItem,
  IonTitle,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItemOptions,
  IonItemOption,
  IonText,
} from "@ionic/react";
import { card } from "ionicons/icons";
import Rating from "../components/Rating";
import { useHistory } from "react-router";
import ProgressiveImage from "react-progressive-graceful-image";

export default function Product({ product, history }) {
  console.log(product);
  return (
    <IonCard style={{ boxShadow: "none" }}>
      <IonItemSliding key={product.image}>
        <IonItem
          className="ion-no-padding"
          lines="none"
          style={{
            paddingTop: "0px !important",
          }}
          onClick={(e) => history.push(`/product/${product._id}`)}
        >
          <div className=" ">
            <ProgressiveImage
              delay={3000}
              src="https://placehold.it/300x200/a334d2/ffffff/&text=LargeImage"
              placeholder="https://placehold.it/30x20/a334d2/ffffff/&text=TinyPlaceholder"
              rootMargin="0% 0% 0%"
              threshold={[1]}
            >
              {(src) => <img src={product.image} alt="an alternative text" />}
            </ProgressiveImage>

            <IonCardHeader className="card-head">
              <IonCardTitle style={{ fontSize: "1rem" }} className="tw-pb-2">
                {product.name}
              </IonCardTitle>
              {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
              <Rating
                className="tw-text-xs"
                value={product.rating}
                text={` ${product.rating} (${product.numReviews})`}
              ></Rating>
              <IonCardSubtitle
                style={{ fontSize: ".95rem" }}
                className="tw-p-0 tw-m-0"
                color="black"
              >
                ${product.price}
              </IonCardSubtitle>
            </IonCardHeader>
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
    // </div>
  );
}
