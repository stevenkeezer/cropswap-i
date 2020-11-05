import React from "react";
import HomeHero from "./HomeHero";
import SubFooter from "./SubFooter";
import Logo from "./Logo";

const Footer = ({ history }) => (
  <>
    <div
      style={{
        backgroundColor: "rgb(0, 103, 99)",
        height: "11.125rem",
        marginTop: "8.9375rem",
        display: "grid",
        // gridTemplateColumns: "3fr 2fr",
        columnGap: "1rem",
      }}
    >
      <HomeHero></HomeHero>
      <div
        style={{
          width: "100%",
          position: "relative",
          textAlign: "left",
        }}
      ></div>
    </div>
    <footer class="tw-bg-white tw-text-gray-700 tw-pt-16 tw-pb-16 ">
      <div class="tw-mx-auto tw-px-1 tw-container tw-overflow-hidden tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-max-w-screen-xl">
        <div
          href="/"
          class="  tw-items-baseline tw-mr-4 tw-w-1/3 hover:tw-no-underline"
        >
          <div className="tw-flex tw-items-center tw-px-2">
            <Logo history={history} />
            <span className="tw-italic tw-text-orange-700 tw-text-3xl tw-mb-1 tw-font-semibold  tw-ml-3">
              cropswap
            </span>
          </div>
          <div className="tw-text-gray-600 tw-px-5 tw-tracking-wide tw-leading-6 tw-text-sm tw-mt-4 lg:tw-flex tw-hidden tw-w-11/12 ">
            A community connecting farmers consumers, people, retailers, and
            brands since 2020.
          </div>
        </div>
        <div class="tw-w-2/3 tw-block sm:tw-flex tw-text-sm tw-mt-6 lg:tw-mt-0">
          <ul class="tw-text-gray-700 tw-list-none tw-p-0  tw-flex tw-flex-col tw-text-left tw-w-full">
            <li class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-800 tw-capitalize tw-text-xl tw-font-semibold tw-tracking-wide">
              Product
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Integrations
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                FAQ
              </a>
            </li>
          </ul>
          <ul class="text-gray-700 tw-list-none tw-p-0  tw-flex tw-flex-col tw-text-left tw-w-full">
            <li class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-800 tw-capitalize tw-text-xl tw-font-semibold tw-tracking-wide">
              Discover
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Brands
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Deliveries
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Farm supplies
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Produce
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Fruit
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Veggies
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Terms of Service
              </a>
            </li>
          </ul>
          <ul class="tw-text-gray-700 tw-list-none tw-p-0  tw-flex tw-flex-col tw-text-left tw-w-full">
            <li class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-800 tw-capitalize tw-text-xl tw-font-semibold tw-tracking-wide">
              Developers
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Developer API
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#"
                class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
              >
                Guides
              </a>
            </li>
          </ul>
          <div class="tw-text-gray-700 tw-flex tw-flex-col tw-w-full">
            <div class="tw-inline-block tw-py-2 tw-px-3 tw-text-gray-800 tw-capitalize tw-text-xl tw-font-semibold tw-tracking-wide">
              Follow Us
            </div>
            <div class="tw-flex tw-pl-4 tw-justify-start tw-mt-2">
              <a
                class="tw-block tw-flex tw-items-center tw-text-gray-300 hove6:tw-text-gray-700 tw-mr-6 tw-no-underline tw-text-base tw-font-base"
                href="#"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="tw-fill-current tw-w-5 tw-h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                </svg>
              </a>
              <a
                class="tw-block tw-flex tw-items-center tw-text-gray-300 hove6:tw-text-gray-700 tw-mr-6 tw-no-underline tw-text-base tw-font-base"
                href="#"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="tw-fill-current tw-w-5 tw-h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a
                class="tw-block tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-700 tw-no-underline tw-text-base tw-font-base"
                href="#"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="tw-fill-current tw-w-5 tw-h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <SubFooter />
  </>
);

export default Footer;
