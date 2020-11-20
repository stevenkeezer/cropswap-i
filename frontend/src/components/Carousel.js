import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { IonImg } from "@ionic/react";
import Rating from "./Rating";

const ProductCarousel = ({ history }) => {
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
      <div style={{ height: 10 }} className=" tw-hidden sm:tw-block"></div>
      <div class="  sm:tw-px-4 xl:tw-px-0   tw-pb-0">
        <div class="tw-flex tw-flex-row tw-flex-wrap tw--mx-2">
          <div
            onClick={() => history.push(`/product/${products[1]._id}`)}
            class="tw-w-full md:tw-w-1/2 tw-cursor-pointer  tw-hidden sm:tw-block tw-h-56 md:tw-h-auto tw-mb-4 tw-px-2"
          >
            <div class="tw-relative tw-bg-gray-100 tw-h-full tw-w-full sm:tw-rounded-3xl">
              <img
                class="tw-absolute tw-h-full sm:tw-rounded-3xl tw-w-full tw-object-cover"
                src={products.length > 1 && products[1].image}
                alt=""
              />
              <div class=" sm:tw-rounded-3xl sm:tw-px-8  tw-absolute tw-px-4 tw-bg-black tw-bg-opacity-25 tw-h-full tw-w-full">
                <div className="tw-h-24  md:tw-h-48 md:tw-mt-3"></div>
                <h2 class="tw-text-white  tw-text-3xl  tw-font-bold tw-leading-tight tw-mb-2 tw-pr-5">
                  {products && (
                    <div>{products.length > 1 && products[1].name}</div>
                  )}
                </h2>
                <div class="tw-flex tw-w-full tw-items-center tw-text-sm tw-text-gray-300 tw-font-medium">
                  <div class="tw-flex-1 tw-flex tw-items-center">
                    {/* <div class="tw-rounded-full tw-w-10 tw-h-10 tw-mr-3 tw-items-center tw-justify-center tw-flex tw-bg-gray-300 tw-text-black">
                      ${products.length > 1 && products[1].price}
                    </div> */}
                    <div>
                      <Rating
                        value={products.length > 1 && products[1].rating}
                      ></Rating>
                      <div className="tw-mt-3">
                        {products.length > 1 && products[1].category}
                      </div>
                    </div>
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
                  class="tw-block tw-w-full sky tw-h-full tw-overflow-y-hidden sm:tw-rounded-3xl tw-relative  tw-bg-no-repeat"
                  href="#"
                  title="Link"
                  style={{
                    backgroundPosition: "top right",
                    backgroundImage: "url('/farmers.svg')",
                  }}
                >
                  <div className="sun"></div>
                </a>
              </div>
              <div class="tw-w-full sm:tw-w-1/2 md:tw-w-full tw-hidden sm:tw-block tw-h-40 xl:tw-h-42 tw-px-2">
                <div
                  class="tw-block tw-w-full tw-h-full tw-bg-gray-300 sm:tw-rounded-3xl tw-bg-no-repeat tw-bg-center tw-bg-cover"
                  href="#"
                  title="Link"
                >
                  <div class="tw-relative tw-h-full">
                    <div
                      onClick={() =>
                        history.push(`/product/${products[0]._id}`)
                      }
                      class="tw-relative tw-cursor-pointer lg:tw-flex tw-h-full sm:tw-rounded-3xl tw-bg-gray-100 tw-overflow-hidden"
                    >
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
                          class="tw-absolute tw-h-full tw-text-gray-100  tw-w-24 tw--ml-12"
                          fill="currentColor"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>
                        <div class="tw-relative tw-py-12 lg:tw-py-4 lg:tw-px-8 tw-text-gray-700 tw-leading-relaxed">
                          <a
                            href="#"
                            class="tw-font-semibold tw-text-2xl tw-text-gray-900 tw-w-full tw-flex hover:tw-text-teal-900"
                          >
                            {products.length > 1 && products[0].name}
                          </a>
                          <div className="tw-px-2">
                            ${products.length > 1 && products[0].price}{" "}
                          </div>
                          <div className="tw-bg-teal-500 tw-mt-3 tw-text-teal-100 tw-px-3 tw-font-bold tw-py-1 tw-text-center tw-rounded-full">
                            See more
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
      </div>
    </>
  );
};

export default ProductCarousel;
