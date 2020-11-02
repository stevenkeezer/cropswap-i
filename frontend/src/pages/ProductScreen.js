import { IonButton, IonIcon, IonText, IonTitle } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubFooter from "../components/SubFooter";
import LazyImage from "../components/LazyImage";
// import Meta from "../components/Meta";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import {
  EuiFormRow,
  EuiPanel,
  EuiFieldPassword,
  EuiButton,
  EuiFieldText,
} from "@elastic/eui";
import ElasticComment from "../components/ElasticComment";
import ElasticImage from "../components/ElasticImage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
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
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET });

    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
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
      <div
        style={{ backgroundColor: "#fafbfd" }}
        className=" tw-h-auto tw-antialiased "
      >
        <div className=" tw-px-4  tw-pt-5 tw-max-w-screen-xl tw-mx-auto">
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
              <Meta title={product.name} />
              <Row className="justify-content-center mt-4">
                <Col md={6} size={12} className="tw-mb-8">
                  <LazyImage
                    src={product.image}
                    placeholder={product.image}
                    height={500}
                  />
                  {/* <ElasticImage image={product.image} name={product.name} /> */}
                </Col>

                <Col md={3}>
                  <div className="tw-text-xs  tw-font-base tw-pb-2 tw-tracking-wide tw-font-base tw-text-gray-800">
                    {product.category}
                  </div>
                  <div className="tw-text-2xl  tw-font-medium tw-text-gray-900">
                    {product.name}
                  </div>

                  <div variant="flush" className="tw-border-none tw-mt-2">
                    <div>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    <div className="tw-py-6">
                      <span className="tw-font-bold tw-text-gray-900 tw-text-2xl">
                        ${product.price}{" "}
                      </span>
                      <span className="tw-text-sm tw-text-gray-800">each</span>
                    </div>
                    <div className="tw-border-none  tw-mt-1">
                      <div variant="flush">
                        <div>
                          <Row>
                            <Col>
                              {product.countInStock > 0 && "Out Of Stock"}
                            </Col>
                          </Row>
                        </div>

                        {product.countInStock > 0 && (
                          <div>
                            <Row>
                              <Col>Quantity</Col>

                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Row>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {product.countInStock > 0 ? (
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
                </Col>
              </Row>

              <div className="tw-py-3 tw-pt-5 tw-text-xl tw-text-gray-900 tw-font-semibold">
                Product Description
              </div>
              <div className="tw-leading-6 tw-text-md">
                {product ? product.description : <div>No description</div>}
              </div>
              <Row>
                <Col className="tw-max-w-screen-lg tw-mx-10 tw-text-gray-800 tw-my-8 tw-mx-auto">
                  <div className="tw-py-3 tw-pt-5 tw-text-xl tw-text-gray-900 tw-font-semibold">
                    Customer Reviews
                  </div>
                  {product &&
                    product.reviews &&
                    product.reviews.length === 0 && (
                      <Message>No Reviews</Message>
                    )}
                  <ListGroup variant="flush">
                    <ElasticComment reviews={product.reviews}></ElasticComment>

                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button type="submit" variant="primary">
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review{" "}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
