import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiShowFor,
} from "@elastic/eui";
import { IonIcon, IonText } from "@ionic/react";
import { NProgress } from "@tanem/react-nprogress";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import Bar from "../components/Bar";
import Container from "../components/Container";
import ElasticComment from "../components/ElasticComment";
import LazyImage from "../components/LazyImage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import ReviewChart from "../components/ReviewChart";
import ReviewModal from "../components/ReviewModal";
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
      <NProgress isAnimating={loading}>
        {({ animationDuration, isFinished, progress }) => (
          <Container
            animationDuration={animationDuration}
            isFinished={isFinished}
          >
            <Bar animationDuration={animationDuration} progress={progress} />
            {/* <Spinner /> */}
          </Container>
        )}
      </NProgress>
      <EuiPage restrictWidth="75rem" className="tw-px-4 tw-bg-white">
        <div className=" ">
          <Link
            className="tw-items-center tw-px-0 tw-flex hover:tw-no-underline  "
            to="/"
          >
            <IonIcon
              icon={chevronBackOutline}
              className="tw-text-sm tw-text-gray-700 tw-h-5 tw-w-5 tw--ml-1 tw-mr-2 "
              size="small"
            ></IonIcon>
            <IonText
              className="tw-text-md hover:tw-text-gray-600  tw-text-gray-800"
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
              <div className="sm:tw-pt-8 lg:tw-pt-16  tw-flex tw-flex-col sm:tw-flex-row tw-max-w-screen-lg  tw-pt-5 tw-mx-auto tw-justify-center ">
                <div className=" tw-w-full sm:tw-w-8/12  tw-mx-auto">
                  <EuiShowFor sizes={["xs"]}>
                    <LazyImage
                      src={product && product.image}
                      placeholder={product && product.image}
                      shadow
                      height={470}
                      border={false}
                    />
                  </EuiShowFor>
                  <EuiShowFor sizes={["s", "m", "l", "xl"]}>
                    <LazyImage
                      src={product && product.image}
                      placeholder={product && product.image}
                      shadow
                      height={"auto"}
                      border={false}
                    />
                  </EuiShowFor>
                </div>

                <div className="tw-w-full sm:tw-px-4 ">
                  <div className="tw-text-xs  tw-font-base tw-pb-2  tw-mt-3 tw-tracking-wide tw-font-base tw-text-gray-600">
                    {product && product.category}
                  </div>
                  <div className=" tw-text-2xl sm:tw-text-3xl tw-font-semibold  tw-text-gray-900">
                    {product && product.name}
                  </div>

                  <div variant="flush" className="tw-border-none tw-mt-3">
                    <div className="tw-hidden sm:tw-flex">
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
                      className="tw-mt-6 tw-w-48 tw-text-sm tw-font-semibold tw-rounded-full"
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
                  <div className="tw-leading-6 tw-text-md tw-max-w-screen-lg tw-text-gray-900 tw-tracking-normal tw-mx-auto">
                    {product ? (
                      product && product.description
                    ) : (
                      <div>No description</div>
                    )}
                  </div>

                  <div className="tw-my-4">
                    <span className="tw-bg-gray-300 tw-bg-opacity-50 tw-text-gray-900 tw-font-semibold tw-px-1 tw-text-xs  tw-rounded-sm">
                      {product && product.brand}
                    </span>
                  </div>

                  <div className="tw-flex tw-mt-8">
                    <EuiButton
                      className="tw-border-gray-400 tw-text-sm tw-text-gray-800 tw-shadow-none"
                      iconType="heart"
                    >
                      Favorite
                    </EuiButton>
                    <EuiButton
                      className="tw-border-gray-400 tw-ml-4 tw-text-sm tw-text-gray-800 tw-shadow-none "
                      iconType="share"
                    >
                      Share
                    </EuiButton>
                  </div>
                </div>
              </div>

              <Row>
                {/* <div className="tw-max-w-screen-lg tw-mx-10 tw-text-gray-800 tw-my-8 tw-mx-auto">
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
                </div> */}
              </Row>
            </>
          )}
        </div>
      </EuiPage>
      <EuiHorizontalRule margin="m" className="tw-border-gray-400" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className=" tw-text-sm tw-text-gray-900 tw-max-w-screen-xl tw-px-4 tw-mx-auto tw-font-semibold">
            Reviews
          </div>

          <EuiHorizontalRule margin="m" />

          <div className="tw-max-w-screen-md tw-mx-auto">
            <div className="tw-flex tw-justify-between">
              <h2 class="tw-text-gray-900 tw-font-semibold tw-pb-5 tw-mt-2">
                Reviews
              </h2>
              <ReviewModal />
            </div>
            <ReviewChart product={product} />
            {product && product.reviews && product.reviews.length < 1 && (
              <Message>No Reviews</Message>
            )}
            {product && product.reviews && product.reviews.length > 0 && (
              <ElasticComment reviews={product.reviews}></ElasticComment>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
