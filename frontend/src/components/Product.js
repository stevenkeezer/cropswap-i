import React, { useEffect } from "react";
import {
  EuiCard,
  EuiFlexItem,
  EuiText,
  EuiLoadingContent,
  EuiSpacer,
} from "@elastic/eui";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";

export default function Product({ product, history }) {
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    history.push(`/product/${id}`);
  };

  console.log(product, "ah");

  return (
    <>
      <EuiFlexItem
        className="flexCard tw-mb-16"
        onClick={(e) => clickHandler(product._id)}
      >
        {product.image ? (
          <EuiCard
            paddingSize="none"
            textAlign="left"
            rounded="false"
            image={
              <img
                className="lg:tw-h-56 tw-pt-3 tw-w-auto tw-object-cover tw-cursor-pointer"
                src={product.image}
                style={{ borderRadius: "0px!important" }}
              />
            }
            grow={false}
            display="plain"
            className="tw-object-fit"
            title={
              <EuiText>
                <div className="tw-cursor-pointer tw-text-gray-800 tw-text-xs  tw-font-medium tw-tracking-wide">
                  {product.category}
                </div>
                <div className="tw-cursor-pointer tw-text-gray-800  sm:tw-text-sm tw-font-semibold tw-tracking-wide">
                  {product.name}
                </div>
              </EuiText>
            }
            description={
              <EuiText>
                <div className="tw-cursor-pointer tw-text-gray-800 tw-text-sm tw-font-medium tw-tracking-wide">
                  ${product.price}
                </div>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}`}
                />
              </EuiText>
            }
          />
        ) : (
          <EuiLoadingContent lines={3} />
        )}
      </EuiFlexItem>
    </>

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
