// MOBX
import {
  EuiFlexGroup,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiShowFor,
  EuiPageHeader,
  EuiPageContentHeader,
} from "@elastic/eui";
import {
  IonAlert,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonText,
} from "@ionic/react";
import { chevronBackOutline, chevronDown } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions.js";
import { logout } from "../actions/userActions";
import Alert from "../components/Alert";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import CategorySlider from "../components/CategorySlider";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import SearchEmpty from "../components/SearchEmpty";

const HomeScreen = ({ match }) => {
  function doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

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

  return (
    <>
      <div className="">
        <EuiShowFor sizes={["xs", "s", "m", "l"]}>
          <CategorySlider history={history} />
        </EuiShowFor>
        {!keyword && <Alert />}
      </div>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDown}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Loading..."
        ></IonRefresherContent>
      </IonRefresher>
      <EuiPage className=" tw-m-0 tw-p-0  tw-bg-white">
        <EuiPageBody restrictWidth="75rem">
          {!keyword && <Carousel />}

          <EuiPageContent className="tw-bg-white tw-p-2  tw-shadow-none">
            <Meta />
            <div>
              {!keyword ? (
                <>{!loading && <Categories history={history} />}</>
              ) : (
                <div className="  tw-mx-auto tw-px-2 tw-mt-8 lg:tw-mt-3">
                  {!keyword && !loading && (
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
                  )}
                </div>
              )}
              {loading ? (
                <Loader />
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
                  <div className=" tw-mb-4  sm:tw-pt-2 tw-items-center  tw-text-gray-900 tw-antialiased tw-leading-tight ">
                    {!keyword ? (
                      <div className="tw-p-0  tw-mx-auto xl:tw-px-4 md:tw-pt-2 tw-px-2  tw-items-center  tw-justify-between tw-text-2xl tw-font-medium tw-flex  sm:tw-pb-4 ">
                        <div className="tw-text-xl  tw-font-semibold tw-tracking-wide tw-text-gray-900">
                          Featured brands
                        </div>
                        <div className="tw-justify-end">
                          <IonText className="tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-text-gray-700 hover:tw-bg-teal-500 hover:tw-text-white  tw-font-semmibold tw-text-sm tw-rounded">
                            View all
                          </IonText>
                        </div>
                      </div>
                    ) : products.length !== 0 ? (
                      <div className="tw-p-0  tw-mx-auto tw-px-4  tw-mt-10 tw-justify-between tw-text-xl tw-font-medium tw-flex tw-pb-3 ">
                        Search results
                      </div>
                    ) : (
                      <SearchEmpty history={history} />
                    )}
                  </div>

                  <EuiFlexGroup
                    wrap
                    columns={4}
                    gutterSize="s"
                    className="md:tw-px-4"
                  >
                    {products &&
                      products.length &&
                      products.map((product) => (
                        <Product product={product} history={history} />
                      ))}
                  </EuiFlexGroup>

                  <div className="tw-mx-auto tw-flex tw-pt-16 tw-pb-16 tw-justiy-center">
                    <Paginate
                      pages={pages && pages}
                      page={page && page}
                      keyword={keyword ? keyword : ""}
                    />
                  </div>

                  {/* <HomeHero /> */}
                  {/* <Regions /> */}
                </>
              )}
            </div>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>

      {!keyword && !loading && <Footer history={history} />}
    </>
  );
};

export default HomeScreen;
