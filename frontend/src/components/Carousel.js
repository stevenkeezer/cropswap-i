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
              <div className=" tw-flex tw-justify-between tw-w-full tw-px-8 lg:tw-mx-8 lg:tw-h-64 tw-h-46 lg:tw-mb-12">
                <div class="tw-absolute tw-top-0 tw-right-0 ">
                  <svg
                    class="tw-block tw-ml-auto tw-h-auto tw-w-2/5 tw-rotate-180 tw-p-5  tw-transform"
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
                <div className="tw-pb-6 lg:tw-w-1/2 tw-mr-auto tw-m-2 tw-flex tw-items-center tw-w-full tw-pt-6 lg:tw-pt-0">
                  <div className="tw-border-4 tw-rounded-full tw-mr-5 ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className=" tw-w-24 tw-rounded-full tw-object-cover tw-shadow-2xl tw-h-24"
                    />
                  </div>
                  <div className="tw-flex-col">
                    <p
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
                      className="tw-text-xs tw--mb-3 tw-font-bold tw-text-white tw-pb-3 tw-mt-2"
                    >
                      Promo Code OCT20
                    </p>
                    <div
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.10)" }}
                      className="tw--pt-1 tw-text-2xl lg:tw-text-3xl tw-font-bold tw-text-white  "
                    >
                      {product.name}
                    </div>
                    <button class="tw-bg-white tw-font-bold tw-py-2 tw-mt-2 tw-px-5 tw-text-black tw-shadow tw-rounded-full tw-text-xs">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div className="tw-w-3/6 tw-absolute tw-right-0 tw-mr-10 tw-mt-6 lg:tw-visible tw-invisible">
                <img
                  src="/farmers.svg"
                  alt={product.name}
                  // fluid
                  className=" tw-mt-8 tw-w-full tw-p-0 tw-h-full"
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
