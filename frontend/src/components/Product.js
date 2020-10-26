import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/react";
import React from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import {
  EuiFormRow,
  EuiPanel,
  EuiFieldPassword,
  EuiButton,
  EuiFieldText,
  EuiFlexItem,
  EuiCard,
  EuiIcon,
} from "@elastic/eui";

export default function Product({ product, history }) {
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    history.push(`/product/${id}`);
  };

  console.log(product);
  return (
    <EuiFlexItem className="flexCard" style={{ minWidth: 200 }}>
      <EuiCard
        paddingSize="none"
        textAlign="left"
        // href="https://elastic.github.io/eui/"
        image={product.image}
        grow={false}
        display="plain"
        onClick={(e) => clickHandler(product._id)}
        className="tw-object-fit"
        // icon={<EuiIcon size="xxl" type="logoBeats" />}
        title={product.name}
        description={product.price}
      />
    </EuiFlexItem>
    // <IonCard style={{ boxShadow: "none" }} className="tw-rounded-none">
    //   <IonItemSliding key={product.image} className="tw-rounded-none">
    //     <IonItem
    //       className="ion-no-padding tw-rounded-none"
    //       lines="none"
    //       style={{
    //         paddingTop: "0px !important",
    //       }}
    //       onClick={(e) => clickHandler(product._id)}
    //     >
    //       <div className=" ">
    //         <ProgressiveImage
    //           delay={3000}
    //           src="https://placehold.it/300x200/a334d2/ffffff/&text=LargeImage"
    //           placeholder="https://placehold.it/30x20/a334d2/ffffff/&text=TinyPlaceholder"
    //           rootMargin="0% 0% 0%"
    //           threshold={[1]}
    //         >
    //           {(src) => (
    //             <img
    //               src={product.image}
    //               className=" tw-shadow-sm tw-object-cover  md:tw-w-full sm:tw-h-56 tw-h-64 tw-w-full"
    //               alt="an alternative text"
    //             />
    //           )}
    //         </ProgressiveImage>

    //         <IonCardHeader className="card-head">
    //           <IonCardTitle style={{ fontSize: "1rem" }} className="tw-pb-2">
    //             {product.name}
    //           </IonCardTitle>
    //           {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
    //           <Rating
    //             className="tw-text-xs"
    //             value={product.rating}
    //             text={` ${product.rating} (${product.numReviews})`}
    //           ></Rating>
    //           <IonCardSubtitle
    //             style={{ fontSize: ".95rem" }}
    //             className="tw-p-0 tw-m-0"
    //             color="black"
    //           >
    //             ${product.price}
    //           </IonCardSubtitle>
    //         </IonCardHeader>
    //       </div>
    //     </IonItem>

    //     <IonItemOptions side="end">
    //       <IonItemOption
    //         // onClick={(e) => _delete(e, value)}
    //         color="danger"
    //       >
    //         Delete
    //       </IonItemOption>
    //     </IonItemOptions>
    //   </IonItemSliding>
    // </IonCard>
  );
}
