import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductTable from "../components/ProductTable";

import { IonIcon, IonButton } from "@ionic/react";

import {
  checkmarkOutline,
  trashOutline,
  createOutline,
  closeOutline,
} from "ionicons/icons";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="lg:tw-bg-gray-100 lg:tw-mt-24 tw-mt-12 ">
      <div className="tw-max-w-screen-xl tw-mx-auto tw-px-4">
        <div className="tw-flex tw-pt-8 tw-justify-between">
          <div className="tw-text-2xl tw-font-semibold">Products</div>
          <IonButton className="" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </IonButton>
        </div>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="tw-text-2xl tw-font-semibold  lg:tw-shadow  tw-mt-4 tw-mx-auto">
              <ProductTable
                products={products}
                deleteHandler={deleteHandler}
                history={history}
              />
            </div>
            <br></br>
            <Paginate
              pages={pages && pages}
              page={page && page}
              isAdmin={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;
