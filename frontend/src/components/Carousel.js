import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { IonImg } from "@ionic/react";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div class="  tw-px-0 sm:tw-pt-3 tw-pb-0">
        <div class="tw-flex tw-flex-row tw-flex-wrap tw--mx-2">
          <div class="tw-w-full md:tw-w-1/2 tw-h-64 md:tw-h-auto tw-mb-4 tw-px-2">
            <div class=" tw-bg-gray-100 tw-h-full tw-w-full sm:tw-rounded">
              <div
                style={{
                  backgroundSize: "355px",
                }}
                class="tw-block tw-rounded-lg tw-relative tw-transform tw-transition-all tw-duration-300 tw-scale-100"
              >
                <img
                  class="tw-absolute tw-h-full tw-w-full tw-object-cover"
                  src={products.length > 1 && products[1].image}
                  alt=""
                />
                <div class="tw-h-24 lg:tw-h-64"></div>

                <h2 class="tw-text-white tw-text-2xl tw-font-bold tw-leading-tight tw-mb-3 tw-pr-5">
                  {products && (
                    <div>{products.length > 1 && products[1].name}</div>
                  )}
                </h2>
                <div class="tw-flex tw-w-full tw-items-center tw-text-sm tw-text-gray-300 tw-font-medium">
                  <div class="tw-flex-1 tw-flex tw-items-center">
                    <div
                      class="tw-rounded-full tw-w-8 tw-h-8 tw-mr-3"
                      style={{
                        background:
                          "url(https://randomuser.me/api/portraits/women/74.jpg)",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div>Gwen Thomson</div>
                  </div>
                  <div>
                    <i class="mdi mdi-thumb-up"></i> 18
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div class="tw-w-full md:tw-w-1/2 tw-mb-4 tw-px-2">
            <div class="tw-flex tw-flex-col sm:tw-flex-row md:tw-flex-col tw--mx-2">
              <div class="tw-w-full sm:tw-w-1/2 md:tw-w-full tw-h-40 xl:tw-h-42 tw-mb-4 sm:tw-mb-0 md:tw-mb-4 tw-px-2">
                <a
                  class="tw-block tw-w-full tw-h-full sm:tw-rounded tw-bg-orange-300  tw-bg-no-repeat"
                  href="#"
                  title="Link"
                  style={{
                    backgroundSize: "355px",
                    backgroundPosition: "top right",
                    backgroundImage: "url('/farmers.svg')",
                  }}
                ></a>
              </div>
              <div class="tw-w-full sm:tw-w-1/2 md:tw-w-full tw-h-40 xl:tw-h-42 tw-px-2">
                <div
                  class="tw-block tw-w-full tw-h-full tw-bg-gray-300 sm:tw-rounded tw-bg-no-repeat tw-bg-center tw-bg-cover"
                  href="#"
                  title="Link"
                  // style={{
                  //   backgroundImage:
                  //     "url(https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Image)",
                  // }}
                >
                  {/* <img
                    className="tw-absolute tw-object-cover tw-h-32"
                    src={products.length > 1 && products[1].image}
                  ></img> */}

                  <div class="tw-relative tw-h-full">
                    <div class="tw-relative lg:tw-flex tw-h-full tw-rounded tw-bg-gray-100 tw-overflow-hidden">
                      <div class="lg:tw-w-5/12 tw-h-full tw-relative tw-flex tw-items-center tw-justify-center">
                        <img
                          class="tw-absolute tw-h-full tw-w-full tw-object-cover"
                          src={products.length > 1 && products[0].image}
                          alt=""
                        />
                        <div class="tw-absolute tw-inset-0 tw-bg-indigo-900 tw-opacity-25"></div>
                      </div>
                      <div class="tw-relative lg:tw-w-7/12 tw-bg-gray-100">
                        <svg
                          class="tw-absolute tw-h-full tw-text-gray-100 tw-w-24 tw--ml-12"
                          fill="currentColor"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>
                        <div class="tw-relative tw-py-12 lg:tw-py-4  tw-px-8 lg:tw-px-16 tw-text-gray-700 tw-leading-relaxed">
                          <p class="tw-mt-2">
                            <a
                              href="#"
                              class="tw-font-medium tw-text-teal-600 hover:tw-text-teal-900"
                            >
                              {products.length > 1 && products[0].name}
                            </a>
                            <p>${products.length > 1 && products[0].price} </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Carousel pause="false" className="tw-antialiased lg:tw-mt-0" fade>
        {products.map((product, index) => (
          <Carousel.Item
            key={product._id}
            className={`${
              index === 0
                ? "carousel-image-two"
                : index === 1
                ? "carousel-image-one"
                : "carousel-image-three"
            }`}
          >
            <Link
              to={`/product/${product._id}`}
              className="tw-flex tw-justify-between tw-w-full hover:tw-no-underline"
            >
              <div className=" tw-flex tw-justify-between tw-w-full tw-px-4 sm:tw-px-8 lg:tw-mx-8 tw-mb-8 tw-mt-2 tw-pb-6 lg:tw-h-64 tw-h-46 lg:tw-mb-12">
                <div class="tw-absolute tw-top-0 tw-right-0 ">
                  <svg
                    class="tw-block tw-ml-auto tw-h-auto sm:tw-w-2/5 tw-w-1/4 tw-rotate-180 tw-p-5  tw-transform"
                    viewBox="0 0 184 184"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M182 184a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 80a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM22 144a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM2 144a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                      fill="#e2e8f0"
                      fill-rule="evenodd"
                      opacity=".5"
                    ></path>
                  </svg>
                </div>
                <div className="tw-pb-6 lg:tw-w-1/2 tw-mr-auto tw-flex tw-items-center tw-w-full sm:tw-pt-6 lg:tw-pt-0">
                  <div className="tw-flex-col lg:tw-text-center tw-w-full lg:tw-mt-6 tw-ml-0 sm:tw-ml-6 tw-ml-2 lg:tw-mr-20">
                    <div
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
                      className={` tw-text-xs sm:tw-mb-3 tw-mt-5 tw-font-bold tw-text-white`}
                    >
                      Promo Code OCT20
                    </div>
                    <div
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
                      className={`tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-white  `}
                    >
                      {product.name}
                    </div>
                    <div
                      className={`tw-bg-white tw-font-bold tw-py-1 sm:tw-py-2 tw-shadow-inner  tw-w-24 lg:tw-mx-auto tw-mt-3 tw-text-center tw-px-3 tw-text-black  tw-rounded-full tw-text-xs tw-bg-white `}
                    >
                      Learn more
                    </div>
                  </div>
                </div>
              </div>
              <div className="tw-w-3/6 hero-img tw-absolute tw-right-0 tw-bottom-0 xs:tw-mr-0   tw--mb-1 md:tw--mb-2 lg:tw--mb-2  tw-visible lg:tw-visible">
                <img
                  src="/farmers.svg"
                  // fluid
                  style={{ minWidth: "250px" }}
                  className=" tw--mb-10  tw-mr-5 sm:tw--mb-16 md:tw--mb-20 tw-mt-auto lg:tw--mb-24 xl:tw--mb-24 "
                />
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
   */}
    </>
  );
};

export default ProductCarousel;
