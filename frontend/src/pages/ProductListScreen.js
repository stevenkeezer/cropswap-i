import { EuiButton } from "@elastic/eui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductTable from "../components/ProductTable";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

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
    <>
      <div
        style={{ backgroundColor: "#fafbfd" }}
        className="tw-antialiased tw-h-auto tw-min-h-screen "
      >
        <Meta title="Products" />
        <div className="tw-max-w-screen-xl tw-mx-auto tw-pb-4 tw-px-4">
          <div className="tw-flex tw-pt-4 tw-justify-between tw-items-center">
            <div className="tw-p-0  lg:tw-pt-6 tw-pt-2 tw-pb-1 sm:tw-px-0 tw-px-4 tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-xl sm:tw-text-2xl tw-font-semibold ">
              Products
            </div>

            <EuiButton
              color="secondary"
              className="tw-mt-3 tw-font-bold tw-text-sm tw-px-4"
              size="m"
              fill
              onClick={createProductHandler}
            >
              Create Product
            </EuiButton>
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
              <div className="tw-text-2xl  lg:tw-shadow tw-text-gray-700  tw-mt-6 tw-mx-auto">
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
                history={history}
                isAdmin={true}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductListScreen;
