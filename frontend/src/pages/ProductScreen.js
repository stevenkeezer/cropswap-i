import {
  EuiButton,
  EuiHorizontalRule,
  EuiFlexGroup,
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
import Product from "../components/Product";
import ReviewChart from "../components/ReviewChart";
import ReviewModal from "../components/ReviewModal";
import { listProducts } from "../actions/productActions.js";
import ReviewTab from "../components/ReviewTab";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
    page,
    pages,
  } = productList;

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
      dispatch(listProducts(keyword, pageNumber));

      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, keyword, pageNumber]);

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
            </>
          )}
        </div>
      </EuiPage>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="tw-px-4 tw-max-w-screen-xl tw-text-xl tw-pt-10 tw-mx-auto tw-font-semibold tw-text-gray-900 tw-pb-3">
            Related products
          </div>
          <div className="tw-py-3  md:tw-px-4 tw-px-2 tw-max-w-screen-xl tw-mx-auto ">
            <EuiFlexGroup wrap columns={4} gutterSize="m">
              {products &&
                products.length !== 0 &&
                products
                  .slice(0, 5)
                  .map((product) => (
                    <Product product={product} history={history} />
                  ))}
            </EuiFlexGroup>
          </div>
          <EuiHorizontalRule margin="none" />
          <ReviewTab />

          <EuiHorizontalRule margin="none" />

          <div
            style={{ maxWidth: 792 }}
            className=" tw-mx-auto tw-mt-8 tw-px-4 lg:tw-px-0 tw-mb-12"
          >
            <div className="tw-flex tw-justify-between">
              <h2 class="tw-text-gray-900 tw-font-semibold tw-pb-5 tw-mt-2">
                Reviews
              </h2>
              <ReviewModal
                submitHandler={submitHandler}
                successProductReview={successProductReview}
                loadingProductReview={loadingProductReview}
                errorProductReview={errorProductReview}
                userInfo={userInfo}
                comment={comment}
                setComment={setComment}
                setRating={setRating}
                rating={rating}
              />
            </div>
            {product && product.reviews && product.reviews.length < 1 ? (
              <>
                <Message>No Reviews</Message>
              </>
            ) : (
              <>
                <ReviewChart product={product} />
                <div className="tw-h-12"></div>
              </>
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
