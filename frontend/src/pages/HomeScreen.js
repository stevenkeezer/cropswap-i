import {
  IonAlert,
  IonCol,
  IonContent,
  IonIcon,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
// MOBX
import {
  EuiFormRow,
  EuiPanel,
  EuiFieldPassword,
  EuiButton,
  EuiFieldText,
  EuiFlexItem,
  EuiFlexGrid,
  EuiCard,
  EuiFlexGroup,
  EuiIcon,
} from "@elastic/eui";

import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions.js";
import { logout } from "../actions/userActions";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import SearchEmpty from "../components/SearchEmpty";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import SubFooter from "../components/SubFooter";
import Loader from "../components/Loader";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const history = useHistory();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  /**
   *
   */

  const logoutHandler = () => {
    dispatch(logout());
  };
  // if (!store.activeUser) return null;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (loading) return <Loader />;
  return (
    <IonPage className="lg:tw-mt-24 tw-mt-12">
      <Meta />
      <IonContent>
        {!keyword ? (
          <>
            {/* <Alert></Alert> */}
            <Carousel />
            <Categories history={history} />
          </>
        ) : (
          <div className=" tw-max-w-screen-xl tw-mx-auto tw-px-2 tw-mt-8 lg:tw-mt-3">
            <Link
              className="tw-items-center tw-flex hover:tw-no-underline "
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
          </div>
        )}

        {loading ? (
          <IonLoading
            cssClass="my-custom-class"
            isOpen={loading}
            name="crescent"
            onDidDismiss={() => loading}
            duration={5000}
          />
        ) : error ? (
          <IonAlert
            isOpen={error}
            // onDidDismiss={() => setShowAlert1(false)}
            cssClass="my-custom-class"
            header={"Alert"}
            subHeader={"Subtitle"}
            message={"This is an alert message."}
            buttons={["OK"]}
          />
        ) : (
          <>
            <div className=" tw-mb-3 tw-px-3 tw-items-baseline ">
              {!keyword ? (
                <div className="tw-p-0 tw-max-w-screen-xl tw-mx-auto xl:tw-px-4 tw-pt-4  tw-justify-between tw-text-2xl tw-font-medium tw-flex tw-pb-4 ">
                  <div className="tw-text-xl tw-font-medium tw-text-gray-900">
                    Featured products
                  </div>
                  <div className="tw-justify-end">
                    <IonText className="tw-border tw-border-gray-400 tw-px-4 tw-py-2 tw-text-gray-800 hover:tw-bg-teal-500 hover:tw-text-white  tw-font-medium tw-text-sm tw-rounded">
                      View all
                    </IonText>
                  </div>
                </div>
              ) : products.length !== 0 ? (
                <div className="tw-p-0 tw-max-w-screen-xl tw-mx-auto xl:tw-px-4  tw-mt-10 tw-justify-between tw-text-2xl tw-font-medium tw-flex tw-pb-3 ">
                  Search results
                </div>
              ) : (
                <SearchEmpty history={history} />
              )}
            </div>

            <EuiFlexGroup wrap className="tw-max-w-screen-xl tw-mx-auto">
              {products.map((product) => (
                <Product product={product} history={history} />
              ))}
            </EuiFlexGroup>

            <div className="tw-mx-auto tw-flex tw-justiy-center">
              <Paginate
                pages={pages && pages}
                page={page && page}
                keyword={keyword ? keyword : ""}
              />
            </div>

            {/* <HomeHero /> */}
            {/* <Regions /> */}

            {!keyword && <Footer />}
          </>
        )}
      </IonContent>
      {keyword && <SubFooter />}
    </IonPage>
  );
};

export default observer(HomeScreen);
