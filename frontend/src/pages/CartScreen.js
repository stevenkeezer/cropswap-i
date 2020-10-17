import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Container,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { chevronBackOutline, trashOutline } from "ionicons/icons";
import {
  IonCard,
  IonImg,
  IonRow,
  IonText,
  IonButton,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonGrid,
  IonInput,
  IonIcon,
  IonCol,
  IonList,
  IonCardHeader,
  IonSelect,
  IonItem,
  IonTitle,
  IonSelectOption,
} from "@ionic/react";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="tw-h-screen tw-pt-3 tw-bg-gray-100">
      <Container>
        {/* <Link className="tw-items-center tw-flex " to="/">
          <IonIcon
            icon={chevronBackOutline}
            className="tw-text-sm tw-text-gray-600 tw-h-4 tw-w-4 tw-pb-1 tw-mr-1 "
            size="small"
            style={{ marginBottom: -3 }}
          ></IonIcon>
          <IonText className="tw-text-md" color="light">
            Back to search
          </IonText>
        </Link> */}
        <IonTitle className="tw-p-0 tw-pb-4 tw-pt-2">
          Your pickup order
        </IonTitle>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <article className="card mb-3 tw-border-none tw-shadow">
                    <div class="row align-items-center tw-p-5">
                      <div class="col-md-6 tw-flex tw-gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="border img-sm"
                          style={{ maxWidth: "100px" }}
                        />

                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div class="col">
                        <div class="input-group input-spinner">
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      </div>
                      <div class="col">
                        <div class="price h5"> ${item.price} </div>
                      </div>
                      <div class="col flex-grow-0 text-right">
                        <IonIcon
                          className="tw-h-6 tw-w-6 tw-text-gray-600"
                          onClick={() => removeFromCartHandler(item.product)}
                          icon={trashOutline}
                        ></IonIcon>
                      </div>
                    </div>
                  </article>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <div className=" card tw-border-none tw-shadow tw-mb-2">
              <div class="card-body">
                <form>
                  <div class="form-group">
                    {/* <label className="tw-text-gray-600 tw-font-medium tw-pb-1 tw-text-sm">
                      Have a coupon?
                    </label> */}
                    <div class="input-group tw-flex tw-items-center">
                      <input
                        type="text"
                        class="form-control"
                        name=""
                        placeholder="Coupon code"
                      />
                      <span class="input-group-append">
                        <IonButton class="">Apply</IonButton>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <IonText>
              ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </IonText> */}
            <Card className="tw-border-none tw-shadow ">
              <ListGroup variant="flush">
                <ListGroup.Item className="tw-border-none">
                  <div className="tw-border-b tw-pb-2 tw-mb-3">
                    <IonText className="tw-font-semibold ">
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)} item)
                    </IonText>
                  </div>

                  <Row>
                    <Col>Total price:</Col>
                    <Col className="tw-text-right">
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="tw-border-none ">
                  <Row className="">
                    <Col>Discount:</Col>
                    <Col className="tw-text-right">$0.00</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="tw-border-none">
                  <Row>
                    <Col className="tw-font-bold tw-text-gray-800">Total:</Col>
                    <Col className="tw-text-right tw-font-bold tw-text-gray-800">
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <hr />
                <p class="tw-justify-end tw-flex mb-3 tw-px-5 tw-pt-3">
                  <img
                    src="/images/payments.png"
                    height="22"
                    className="tw-h-6"
                  />
                </p>
              </ListGroup>
            </Card>
            <Card className="tw-border-none tw-shadow tw-py-5 tw-mt-3 tw-p-4">
              <IonButton
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </IonButton>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartScreen;
