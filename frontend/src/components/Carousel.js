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
      <Carousel
        pause="false"
        className="tw-mt-3  lg:tw-mt-0"
        fade
        // interval={5000}
        style={{
          maxWidth: "75rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
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
              <div className=" tw-flex tw-justify-between tw-w-full tw-px-8 sm:tw-px-8 lg:tw-mx-8 tw-my-6 tw-pb-3 lg:tw-h-64 tw-h-46 lg:tw-mb-12">
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
                  <div className="tw-flex-col lg:tw-text-center tw-w-full lg:tw-mt-16 tw-ml-0 sm:tw-ml-6 lg:tw-mr-20">
                    <div
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
                      className={` tw-text-xs tw-mb-2 tw-mt-2 tw-font-bold tw-text-white`}
                    >
                      Promo Code OCT20
                    </div>
                    <div
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
                      className={`xs:tw-text-xl sm:tw-text-2xl lg:tw-text-4xl tw-font-bold tw-text-white  `}
                    >
                      {product.name}
                    </div>
                    <div
                      className={`tw-bg-white tw-font-bold tw-py-1 sm:tw-py-2  tw-w-24 lg:tw-mx-auto tw-mt-4 tw-text-center tw-px-3 tw-text-black tw-shadow tw-rounded-full tw-text-xs tw-bg-white `}
                    >
                      Learn more
                    </div>
                  </div>
                </div>
              </div>
              <div className="tw-w-3/6 tw-absolute tw-right-0 tw-bottom-0 md:tw--mb-2 lg:tw--mb-2  xl:tw-mr-5 tw-visible lg:tw-visible">
                <img
                  src="/farmers.svg"
                  alt={product.name}
                  // fluid
                  className="tw--mb-12 sm:tw--mb-16 md:tw--mb-20 lg:tw--mb-24 xl:tw--mb-24 "
                  // className=" tw-w-full xl:tw-pt-1 xl:tw-mt-10 lg:tw-mt-12 lg:tw-pt-10 tw-mt-16  sm:tw-mt-10 tw-pt-2   tw-ml-10 sm:tw-ml-0 tw-h-full"
                />
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
