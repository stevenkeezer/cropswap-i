// MOBX
import { EuiFlexGroup, EuiPage, EuiPageBody, EuiShowFor } from "@elastic/eui";
import { IonAlert, IonIcon, IonText } from "@ionic/react";
import { NProgress } from "@tanem/react-nprogress";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions.js";
import Alert from "../components/Alert";
import Bar from "../components/Bar";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import CategorySlider from "../components/CategorySlider";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import SearchEmpty from "../components/SearchEmpty";

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

  return (
    <>
      <NProgress isAnimating={loading}>
        {({ animationDuration, isFinished, progress, minimum }) => (
          <Container
            animationDuration={animationDuration}
            minimum={0.1}
            isFinished={isFinished}
          >
            <Bar
              animationDuration={animationDuration}
              minimum={0.1}
              progress={progress}
            />
          </Container>
        )}
      </NProgress>
      <div className="">
        {!keyword && (
          <>
            <EuiShowFor sizes={["xs", "s", "m"]}>
              <CategorySlider history={history} />
            </EuiShowFor>
            <Alert />
          </>
        )}
      </div>

      <div className="tw-max-w-screen-xl tw-mx-auto">
        {!keyword && <Carousel history={history} />}
      </div>

      <EuiPage className=" tw-m-0 tw-p-0  tw-bg-white">
        <EuiPageBody restrictWidth="75rem">
          <div className="tw-bg-white tw-p-2  tw-shadow-none">
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
                  cssClass="my-custom-class"
                  header={"Alert"}
                  subHeader={"Subtitle"}
                  message={"This is an alert message."}
                  buttons={["OK"]}
                />
              ) : (
                <>
                  <div className=" tw-mb-4 tw-px-2 sm:tw-pt-2 tw-items-center  tw-text-gray-900 tw-antialiased tw-leading-tight ">
                    {!keyword ? (
                      <div className="tw-p-0  tw-mx-auto md:tw-pt-2   tw-items-center  tw-justify-between  xl:tw-px-0 tw-text-2xl tw-font-medium tw-flex tw-pb-2 sm:tw-pb-4 ">
                        <div className="tw-text-xl  tw-font-semibold tw-tracking-wide tw-text-gray-900">
                          Featured brands
                        </div>
                        <div className="tw-justify-end">
                          <IonText className="tw-border tw-border-gray-300 tw-font-sans tw-px-4 tw-py-2 tw-text-gray-700 hover:tw-bg-teal-500 hover:tw-text-white  tw-font-semmibold tw-text-sm tw-rounded">
                            View all
                          </IonText>
                        </div>
                      </div>
                    ) : products.length !== 0 ? (
                      <div className="tw-max-w-screen-xl tw--mt-6 lg:tw-mt-0 tw-px-0 sm:tw-px-2  md:tw-px-0 tw-justify-between tw-text-xl tw-font-semibold tw-flex tw-pb-3 ">
                        Search results
                      </div>
                    ) : (
                      <SearchEmpty history={history} />
                    )}
                  </div>
                  <div className="tw-max-w-screen-xl md:tw-px-2 tw-px-0">
                    <EuiFlexGroup wrap columns={4} gutterSize="m">
                      {products &&
                        products.length !== 0 &&
                        products.map((product) => (
                          <Product product={product} history={history} />
                        ))}
                    </EuiFlexGroup>
                  </div>

                  <Paginate
                    history={history}
                    pages={pages && pages}
                    page={page && page}
                    keyword={keyword ? keyword : ""}
                  />
                </>
              )}
            </div>
          </div>
        </EuiPageBody>
      </EuiPage>
      {!keyword && !loading && <Footer history={history} />}
    </>
  );
};

export default HomeScreen;
