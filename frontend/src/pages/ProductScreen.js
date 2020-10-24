import { IonButton, IonIcon, IonText, IonTitle } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Meta from "../components/Meta";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
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

  const items = [
    { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
  ];

  return (
    <>
      <div className="tw-bg-gray-100 ">
        <div className=" tw-pt-3 lg:tw-mt-24 tw-mt-12 tw-px-4 tw-max-w-screen-xl tw-mx-auto">
          <Link
            className="tw-items-center tw-flex hover:tw-no-underline  "
            to="/"
          >
            <IonIcon
              icon={chevronBackOutline}
              className="tw-text-sm tw-text-gray-600 tw-h-4 tw-w-4 tw-pb-1 tw-mr-1 "
              size="small"
              style={{ marginBottom: -3 }}
            ></IonIcon>
            <IonText
              className="tw-text-md hover:tw-text-teal-600 "
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
                <Col md={6} size={12}>
                  <ElasticImage image={product.image} name={product.name} />
                </Col>

                <Col md={3}>
                  <IonTitle>{product.name}</IonTitle>
                  <ListGroup
                    variant="flush"
                    className="tw-border-none tw-shadow tw-mt-2"
                  >
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <Card className="tw-border-none tw-shadow tw-mt-1">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>
                              <strong>${product.price}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                              {product.countInStock > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty</Col>
                              <Col>
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
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                          <IonButton
                            onClick={addToCartHandler}
                            className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}
                          >
                            Add To Cart
                          </IonButton>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </ListGroup>
                </Col>
              </Row>

              <Row>
                <Col className="tw-max-w-screen-lg tw-mx-10 tw-text-gray-800 tw-my-8 tw-mx-auto">
                  <h2 className="tw-py-4">Customer Reviews</h2>
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
