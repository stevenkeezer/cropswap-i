import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiTextArea,
} from "@elastic/eui";
import { IonIcon, IonText } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import ElasticComment from "../components/ElasticComment";
import LazyImage from "../components/LazyImage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import RatingSelect from "../components/RatingSelect";
import ReviewChart from "../components/ReviewChart";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAdminPopover, setShowAdminPopover] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <EuiPage restrictWidth="75rem" className="tw-px-4 ">
        <div className=" ">
          <Link
            className="tw-items-center tw-px-0 tw-flex hover:tw-no-underline  "
            to="/"
          >
            <IonIcon
              icon={chevronBackOutline}
              className="tw-text-sm tw-text-gray-700 tw-h-5 tw-w-5  tw-mr-2 "
              size="small"
            ></IonIcon>
            <IonText
              className="tw-text-md hover:tw-text-gray-600  tw-text-gray-800 d"
              color="light"
            >
              Back to search
            </IonText>
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Meta title={product && product.name} />
              <div className="tw-pt-12  tw-flex tw-flex-col md:tw-flex-row tw-max-w-screen-lg tw-gap-6 tw-pt-5 tw-mx-auto tw-justify-center mt-3">
                <div className="tw-w-full  tw-mb-8 tw-mx-auto">
                  <LazyImage
                    src={product && product.image}
                    placeholder={product && product.image}
                    shadow
                    border
                  />
                </div>

                <div className="tw-w-full ">
                  <div className="tw-text-xs  tw-font-base tw-pb-2 tw-tracking-wide tw-font-base tw-text-gray-800">
                    {product && product.category}
                  </div>
                  <div className="tw-text-3xl  tw-font-semibold  tw-text-gray-900">
                    {product && product.name}
                  </div>

                  <div variant="flush" className="tw-border-none tw-mt-3">
                    <div>
                      <Rating
                        value={product && product.rating}
                        text={`${product && product.numReviews}`}
                      />
                    </div>
                    <div className="tw-py-6">
                      <span className="tw-font-bold tw-text-gray-900 tw-text-2xl">
                        ${product && product.price}{" "}
                      </span>
                      <span className="tw-text-sm tw-text-gray-800">each</span>
                    </div>
                    <div className="tw-border-none  tw-mt-1">
                      <div variant="flush">
                        <div>
                          <Row>
                            <Col>
                              {product &&
                                product.countInStock === 0 &&
                                "Out Of Stock"}
                            </Col>
                          </Row>
                        </div>

                        {product && product.countInStock > 0 && (
                          <div>
                            <div className="tw-font-semibold tw-text-sm tw-pb-3 tw-tracking-wide">
                              Quantity
                            </div>
                            <NumericInput
                              mobile
                              className="numericInput tw-w-32 tw-h-8 tw-bg-gray-200 tw-text-sm tw-border-none tw-bg-opacity-75"
                              min={1}
                              onKeyDown={(e) => e.preventDefault()}
                              max={product.countInStock}
                              value={qty}
                              onChange={(e) => setQty(e)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {product && product.countInStock > 0 ? (
                    <EuiButton
                      color="secondary"
                      className="tw-mt-5 tw-w-48 tw-text-sm tw-font-semibold tw-rounded-full"
                      size="m"
                      fill
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </EuiButton>
                  ) : (
                    <EuiButton
                      color="secondary"
                      className="tw-mt-5 tw-w-48 tw-text-sm tw-font-semibold tw-rounded-full"
                      size="m"
                      fill
                      disabled
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </EuiButton>
                  )}
                  <div className="tw-py-3 tw-pt-10 tw-text-xl tw-text-gray-900 tw-max-w-screen-lg tw-mx-auto tw-font-semibold">
                    Product description
                  </div>
                  <div className="tw-leading-6 tw-text-md tw-max-w-screen-lg tw-mx-auto">
                    {product ? (
                      product && product.description
                    ) : (
                      <div>No description</div>
                    )}
                  </div>
                </div>
              </div>

              <Row>
                <div className="tw-max-w-screen-lg tw-mx-10 tw-text-gray-800 tw-my-8 tw-mx-auto">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {successProductReview && (
                        <Message variant="success">
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <>
                          <form onSubmit={submitHandler}>
                            <RatingSelect
                              controlId="rating"
                              rating={rating}
                              setRating={setRating}
                            />

                            <EuiTextArea
                              fullWidth
                              placeholder="Write a comment or review"
                              aria-label="Use aria labels when no actual label is in use"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />

                            <button
                              type="submit"
                              className="tw-py-3 tw-mt-3 tw-px-3 tw-border tw-border-gray-300 tw-bg-gray-400 tw-rounded tw-text-900 "
                              disabled={loadingProductReview}
                            >
                              Submit
                            </button>
                          </form>
                        </>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review{" "}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Row>
            </>
          )}
        </div>
      </EuiPage>

      <EuiHorizontalRule margin="m" className="tw-border-gray-400" />
      <div className=" tw-text-sm tw-text-gray-900 tw-max-w-screen-xl tw-px-4 tw-mx-auto tw-font-semibold">
        Reviews
      </div>
      <EuiHorizontalRule margin="m" />

      <div className="tw-max-w-screen-md tw-mx-auto">
        <ReviewChart product={product} />
        {product && product.reviews && product.reviews.length < 1 && (
          <Message>No Reviews</Message>
        )}
        {product && product.reviews && product.reviews.length > 0 && (
          <ElasticComment reviews={product.reviews}></ElasticComment>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
