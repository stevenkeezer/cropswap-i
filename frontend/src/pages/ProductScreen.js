import { EuiButton, EuiTextArea, EuiPage } from "@elastic/eui";
import { IonIcon, IonText } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Meta from "../components/Meta";
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
    dispatch({ type: PRODUCT_DETAILS_RESET });
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if ((product && !product._id) || product._id !== match.params.id) {
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
      <EuiPage className="tw-px-0 ">
        <div className=" tw-px-4  tw-pt-3 tw-max-w-screen-xl tw-mx-auto">
          <Link
            className="tw-items-center tw-flex hover:tw-no-underline  "
            to="/"
          >
            <IonIcon
              icon={chevronBackOutline}
              className="tw-text-sm tw-text-gray-700 tw-h-4 tw-w-4  tw-mr-1 "
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
              <div className=" tw-flex tw-flex-col lg:tw-flex-row tw-max-w-screen-lg tw-gap-6 tw-pt-5 tw-mx-auto tw-justify-center mt-3">
                <div className="tw-w-full lg:tw-w-3/5 tw-mb-8 tw-mx-auto">
                  <LazyImage
                    src={product && product.image}
                    placeholder={product && product.image}
                    // height={350}
                    shadow
                    border
                  />
                </div>

                <div className="tw-w-full lg:tw-w-2/5">
                  <div className="tw-text-xs  tw-font-base tw-pb-2 tw-tracking-wide tw-font-base tw-text-gray-800">
                    {product && product.category}
                  </div>
                  <div className="tw-text-2xl  tw-font-medium tw-text-gray-900">
                    {product && product.name}
                  </div>

                  <div variant="flush" className="tw-border-none tw-mt-2">
                    <div>
                      <Rating
                        value={product && product.rating}
                        text={`${product && product.numReviews} reviews`}
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
                            <Row>
                              <Col>Quantity</Col>

                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[
                                  ...Array(
                                    product && product.countInStock
                                  ).keys(),
                                ].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Row>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {product && product.countInStock > 0 ? (
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className="tw-mt-3 tw-rounded-full"
                      size="m"
                      fill
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </EuiButton>
                  ) : (
                    <EuiButton
                      fullWidth
                      color="secondary"
                      className="tw-mt-3 tw-rounded-full"
                      size="m"
                      fill
                      disabled
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </EuiButton>
                  )}
                </div>
              </div>

              <div className="tw-py-3 tw-pt-5 tw-text-xl tw-text-gray-900 tw-max-w-screen-lg tw-mx-auto tw-font-semibold">
                Product Description
              </div>
              <div className="tw-leading-6 tw-text-md tw-max-w-screen-lg tw-mx-auto">
                {product ? (
                  product && product.description
                ) : (
                  <div>No description</div>
                )}
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
                  <div className="tw-py-3 tw-pt-5 tw-mb-3 tw-text-xl tw-text-gray-900 tw-max-w-screen-lg tw-mx-auto tw-font-semibold">
                    Customer Reviews
                  </div>
                  {product &&
                    product.reviews &&
                    product.reviews.length === 0 && (
                      <Message>No Reviews</Message>
                    )}
                  {product &&
                    product.reviews &&
                    product.reviews.length === 0 && (
                      <ElasticComment
                        reviews={product.reviews}
                      ></ElasticComment>
                    )}
                </div>
              </Row>
            </>
          )}
        </div>
      </EuiPage>
    </>
  );
};

export default ProductScreen;
