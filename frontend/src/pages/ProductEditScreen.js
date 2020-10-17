import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonCheckbox,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonText,
  IonPage,
  IonContent,
} from "@ionic/react";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { set } from "mongoose";

const ProductEditScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch(null);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadfilehandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <FormContainer>
      <IonButton onClick={() => history.push("/admin/productlist")}>
        Go back
      </IonButton>
        {loadingUpdate && <div>loading..</div>}
        {errorUpdate && <div>{errorUpdate}</div>}

        <IonText color="danger" padding style={{ fontWeight: "500" }}>
          {/* {initializationError && initializationError.message} */}
          Edit product
        </IonText>

        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="name"
                onIonChange={(e) => {
                  setName(e.detail.value);
                }}
                name="name"
                placeholder={name}
                // value="test@test.com"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Price</IonLabel>
              <IonInput
                type="number"
                onIonChange={(e) => {
                  setPrice(e.detail.value);
                }}
                name="number"
                value={price}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Image</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => {
                  setImage(e.detail.value);
                }}
                placeholder="Enter image uro"
                name="image"
                value={image}
              />
              <input
                type="file"
                onChange={(e) => uploadfilehandler(e)}
                placeholder="Choose file"
                // name="image"
                // value={image}
              />
              {uploading && <div>loading...</div>}
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Brand</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => {
                  setBrand(e.detail.value);
                }}
                placeholder="Enter Brand"
                name="brand"
                value={brand}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Count in stock</IonLabel>
              <IonInput
                type="number"
                onIonChange={(e) => {
                  setCountInStock(e.detail.value);
                }}
                name="count in stock"
                value={countInStock}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Category</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => {
                  setCategory(e.detail.value);
                }}
                placeholder="Enter Category"
                name="price"
                value={category}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => {
                  setDescription(e.detail.value);
                }}
                placeholder="Enter Description"
                name="price"
                value={description}
              />
            </IonItem>

            <div style={{ padding: 10, paddingTop: 20 }}>
              <IonButton
                expand="full"
                style={{ margin: 14 }}
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                Update{" "}
              </IonButton>
            </div>
            {/* <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errorInfo.errMsg}
          duration={2000}
        /> */}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
