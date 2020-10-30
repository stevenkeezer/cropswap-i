import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { IonIcon, IonInput, IonText } from "@ionic/react";
import axios from "axios";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

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
      <Link
        className="tw-items-center tw-flex tw-antialiased hover:tw-no-underline tw-max-w-screen-xl  tw-mx-auto tw-px-4 tw-mt-3 "
        to="/"
      >
        <IonIcon
          icon={chevronBackOutline}
          className="tw-text-sm tw-text-gray-600 tw-h-4 tw-w-4 tw-pb-1 tw-mr-1 "
          size="small"
          style={{ marginBottom: -3 }}
        ></IonIcon>
        <IonText className="tw-text-md hover:tw-text-teal-600 " color="light">
          Back to search
        </IonText>
      </Link>
      {loadingUpdate && <div>loading..</div>}
      {errorUpdate && <div>{errorUpdate}</div>}

      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <EuiFlexGroup
            justifyContent="center"
            className="lg:tw-mt-24 tw-mt-12"
          >
            <EuiFlexItem grow={false}>
              <div class="euiForm">
                <div role="group" class="euiDescribedFormGroup">
                  <div class="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--directionRow euiFlexGroup--responsive">
                    <div class="euiFlexItem">
                      <h3 class="euiTitle euiTitle--xsmall euiDescribedFormGroup__title">
                        Product Name
                      </h3>
                      <div class="euiText euiText--small euiDescribedFormGroup__description">
                        <div class="euiTextColor euiTextColor--subdued">
                          Enter a name to help identify your product.
                        </div>
                      </div>
                    </div>
                    <div class="euiFlexItem euiDescribedFormGroup__fields euiDescribedFormGroup__fieldPadding--xsmall">
                      <div
                        class="euiFormRow"
                        id="i9a5e10a1-1405-11eb-9618-8b3bd9adba2c-row"
                      >
                        <div class="euiFormRow__labelWrapper">
                          <label
                            class="euiFormLabel euiFormRow__label"
                            for="i9a5e10a1-1405-11eb-9618-8b3bd9adba2c"
                          >
                            Name
                          </label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                          <div class="euiFormControlLayout">
                            <div class="euiFormControlLayout__childrenWrapper">
                              <input
                                type="text"
                                id="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                                name="first"
                                class="euiFieldText"
                                onChange={(e) => setName(e.target.value)}
                                aria-describedby="i657d1813-13fe-11eb-b1f4-f78d59463eb1-help"
                                value={name}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="group" class="euiDescribedFormGroup">
                  <div class="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--directionRow euiFlexGroup--responsive">
                    <div class="euiFlexItem">
                      <h3 class="euiTitle euiTitle--xsmall euiDescribedFormGroup__title">
                        Information
                      </h3>
                    </div>
                    <div class="euiFlexItem euiDescribedFormGroup__fields euiDescribedFormGroup__fieldPadding--xsmall">
                      <div
                        class="euiFormRow"
                        id="i9a5e37b1-1405-11eb-9618-8b3bd9adba2c-row"
                      >
                        <div class="euiFormRow__labelWrapper">
                          <label
                            class="euiFormLabel euiFormRow__label"
                            for="i9a5e37b1-1405-11eb-9618-8b3bd9adba2c"
                          >
                            Price
                          </label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                          <div class="euiFormControlLayout">
                            <div class="euiFormControlLayout__childrenWrapper">
                              <input
                                type="number"
                                id="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                                name="first"
                                class="euiFieldText"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                aria-describedby="i657d1813-13fe-11eb-b1f4-f78d59463eb1-help"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="euiFormRow"
                        id="i9a5e37b1-1405-11eb-9618-8b3bd9adba2c-row"
                      >
                        <div class="euiFormRow__labelWrapper">
                          <label
                            class="euiFormLabel euiFormRow__label"
                            for="i9a5e37b1-1405-11eb-9618-8b3bd9adba2c"
                          >
                            Brand
                          </label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                          <div class="euiFormControlLayout">
                            <div class="euiFormControlLayout__childrenWrapper">
                              <input
                                type="text"
                                id="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                                name="first"
                                class="euiFieldText"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                aria-describedby="i657d1813-13fe-11eb-b1f4-f78d59463eb1-help"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="euiFormRow"
                        id="i657d1813-13fe-11eb-b1f4-f78d59463eb1-row"
                      >
                        <div class="euiFormRow__labelWrapper">
                          <label
                            class="euiFormLabel euiFormRow__label"
                            for="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                          >
                            Count in stock
                          </label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                          <div class="euiFormControlLayout">
                            <div class="euiFormControlLayout__childrenWrapper">
                              <input
                                type="number"
                                id="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                                name="first"
                                class="euiFieldText"
                                onChange={(e) =>
                                  setCountInStock(e.target.value)
                                }
                                aria-describedby="i657d1813-13fe-11eb-b1f4-f78d59463eb1-help"
                                value={countInStock}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="group" class="euiDescribedFormGroup">
                  <div class="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--directionRow euiFlexGroup--responsive">
                    <div class="euiFlexItem">
                      <h3 class="euiTitle euiTitle--xsmall euiDescribedFormGroup__title">
                        Multiple fields
                      </h3>
                      <div class="euiText euiText--small euiDescribedFormGroup__description">
                        <div class="euiTextColor euiTextColor--subdued">
                          Here are three form rows. The first form row does not
                          have a title.
                        </div>
                      </div>
                    </div>
                    <div class="euiFlexItem euiDescribedFormGroup__fields euiDescribedFormGroup__fieldPadding--xsmall">
                      <div
                        class="euiFormRow euiFormRow--hasEmptyLabelSpace"
                        id="i9a5e5ec1-1405-11eb-9618-8b3bd9adba2c-row"
                      >
                        <div
                          class="euiFormRow"
                          id="i657d1813-13fe-11eb-b1f4-f78d59463eb1-row"
                        >
                          <div class="euiFormRow__labelWrapper">
                            <label
                              class="euiFormLabel euiFormRow__label"
                              for="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                            >
                              Category
                            </label>
                          </div>
                          <div class="euiFormRow__fieldWrapper">
                            <div class="euiFormControlLayout">
                              <div class="euiFormControlLayout__childrenWrapper">
                                <input
                                  type="text"
                                  id="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                                  name="first"
                                  class="euiFieldText"
                                  onChange={(e) => setCategory(e.target.value)}
                                  aria-describedby="i657d1813-13fe-11eb-b1f4-f78d59463eb1-help"
                                  value={category}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="euiFormRow"
                        id="i657d6631-13fe-11eb-b1f4-f78d59463eb1-row"
                      >
                        <div class="euiFormRow__labelWrapper">
                          <label
                            class="euiFormLabel euiFormRow__label"
                            for="i657d6631-13fe-11eb-b1f4-f78d59463eb1"
                          >
                            File picker
                          </label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                          <div class="euiFilePicker euiFilePicker--large">
                            <div class="euiFilePicker__wrap">
                              <input
                                type="file"
                                id="i657d6631-13fe-11eb-b1f4-f78d59463eb1"
                                class="euiFilePicker__input"
                                onChange={(e) => uploadfilehandler(e)}
                                aria-describedby="i657d6631-13fe-11eb-b1f4-f78d59463eb1-filePicker__prompt"
                              />
                              <div
                                class="euiFilePicker__prompt"
                                id="i657d6631-13fe-11eb-b1f4-f78d59463eb1-filePicker__prompt"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="euiIcon euiIcon--large euiFilePicker__icon"
                                  focusable="false"
                                  role="img"
                                  aria-hidden="true"
                                >
                                  <path d="M9 10.114l1.85-1.943a.52.52 0 01.77 0c.214.228.214.6 0 .829l-1.95 2.05a1.552 1.552 0 01-2.31 0L5.41 9a.617.617 0 010-.829.52.52 0 01.77 0L8 10.082V1.556C8 1.249 8.224 1 8.5 1s.5.249.5.556v8.558zM4.18 6a.993.993 0 00-.972.804l-1.189 6A.995.995 0 002.991 14h11.018a1 1 0 00.972-1.196l-1.19-6a.993.993 0 00-.97-.804H4.18zM6 5v1h5V5h1.825c.946 0 1.76.673 1.946 1.608l1.19 6A2 2 0 0114.016 15H2.984a1.992 1.992 0 01-1.945-2.392l1.19-6C2.414 5.673 3.229 5 4.174 5H6z"></path>
                                </svg>
                                <div class="euiFilePicker__promptText">
                                  Select or drag and drop a file
                                </div>
                                {uploading && <div>loading...</div>}
                              </div>
                              <IonInput
                                type="text"
                                onIonChange={(e) => {
                                  setImage(e.detail.value);
                                }}
                                placeholder="Enter image uro"
                                name="image"
                                value={image}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="euiFormRow"
                        id="i657d1813-13fe-11eb-b1f4-f78d59463eb1-row"
                      >
                        <div class="euiFormRow__labelWrapper">
                          <label
                            class="euiFormLabel euiFormRow__label"
                            for="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                          >
                            Description
                          </label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                          <div class="euiFormControlLayout">
                            <div class="euiFormControlLayout__childrenWrapper">
                              <input
                                type="text"
                                id="i657d1813-13fe-11eb-b1f4-f78d59463eb1"
                                name="first"
                                class="euiFieldText"
                                onChange={(e) => setDescription(e.target.value)}
                                aria-describedby="i657d1813-13fe-11eb-b1f4-f78d59463eb1-help"
                                value={description}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="euiButton euiButton--primary euiButton--fill tw-mt-8"
                type="submit"
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                <span class="euiButtonContent euiButton__content">
                  <span class="euiButton__text">Save form</span>
                </span>
              </button>
            </EuiFlexItem>
          </EuiFlexGroup>
        </>
      )}
    </>
  );
};

export default ProductEditScreen;
