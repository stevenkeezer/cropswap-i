import React from "react";

export default function headertest() {
  return (
    <div>
      <div class="guideSideNav__identity">
        <div class="euiFlexGroup euiFlexGroup--gutterSmall euiFlexGroup--alignItemsCenter euiFlexGroup--justifyContentSpaceBetween euiFlexGroup--directionRow euiFlexGroup--wrap">
          <div class="euiFlexItem euiFlexItem--flexGrowZero">
            <div class="euiFlexGroup euiFlexGroup--gutterSmall euiFlexGroup--alignItemsCenter euiFlexGroup--directionRow euiFlexGroup--wrap">
              <div class="euiFlexItem euiFlexItem--flexGrowZero">
                <a class="guideLogo" aria-label="Go to home page" href="#/">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    class="euiIcon euiIcon--large"
                    focusable="false"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill="#FFF"
                      d="M32 16.77a6.334 6.334 0 00-1.14-3.641 6.298 6.298 0 00-3.02-2.32 9.098 9.098 0 00-.873-5.965A9.05 9.05 0 0022.56.746a9.007 9.007 0 00-5.994-.419 9.037 9.037 0 00-4.93 3.446 4.789 4.789 0 00-5.78-.07A4.833 4.833 0 004.198 9.26a6.384 6.384 0 00-3.035 2.33A6.42 6.42 0 000 15.242 6.341 6.341 0 001.145 18.9a6.305 6.305 0 003.039 2.321 9.334 9.334 0 00-.16 1.725 9.067 9.067 0 001.727 5.333 9.014 9.014 0 004.526 3.287 8.982 8.982 0 005.587-.023 9.016 9.016 0 004.5-3.322 4.789 4.789 0 005.77.074 4.833 4.833 0 001.672-5.542 6.383 6.383 0 003.032-2.331A6.419 6.419 0 0032 16.77z"
                    ></path>
                    <path
                      fill="#FEC514"
                      d="M12.58 13.787l7.002 3.211 7.066-6.213a7.854 7.854 0 00.152-1.557 7.944 7.944 0 00-1.54-4.704 7.897 7.897 0 00-4.02-2.869 7.87 7.87 0 00-4.932.086 7.9 7.9 0 00-3.92 3.007l-1.174 6.118 1.367 2.92z"
                    ></path>
                    <path
                      fill="#00BFB3"
                      d="M5.333 21.228A7.964 7.964 0 006.72 27.53a7.918 7.918 0 004.04 2.874 7.89 7.89 0 004.95-.097 7.921 7.921 0 003.926-3.03l1.166-6.102-1.555-2.985-7.03-3.211-6.885 6.248z"
                    ></path>
                    <path
                      fill="#F04E98"
                      d="M5.288 9.067l4.8 1.137L11.14 4.73a3.785 3.785 0 00-4.538-.023A3.82 3.82 0 005.29 9.065"
                    ></path>
                    <path
                      fill="#1BA9F5"
                      d="M4.872 10.214a5.294 5.294 0 00-2.595 1.882 5.324 5.324 0 00-.142 6.124 5.287 5.287 0 002.505 2l6.733-6.101-1.235-2.65-5.266-1.255z"
                    ></path>
                    <path
                      fill="#93C90E"
                      d="M20.873 27.277a3.737 3.737 0 002.285.785 3.783 3.783 0 003.101-1.63 3.813 3.813 0 00.451-3.484l-4.8-1.125-1.037 5.454z"
                    ></path>
                    <path
                      fill="#07C"
                      d="M21.848 20.563l5.28 1.238a5.34 5.34 0 002.622-1.938 5.37 5.37 0 001.013-3.106 5.312 5.312 0 00-.936-3.01 5.283 5.283 0 00-2.475-1.944l-6.904 6.07 1.4 2.69z"
                    ></path>
                  </svg>
                </a>
              </div>
              <div class="euiFlexItem euiFlexItem--flexGrowZero">
                <a aria-label="Go to home page" class="euiLink" href="#/">
                  <strong>Elastic UI</strong>
                </a>
              </div>
            </div>
          </div>
          <div class="euiFlexItem euiFlexItem--flexGrowZero">
            <div
              class="euiPopover euiPopover--anchorDownCenter"
              id="guidePageChromeThemePopover"
            >
              <div class="euiPopover__anchor">
                <button
                  class="euiButtonIcon euiButtonIcon--text"
                  type="button"
                  aria-label="Open EUI options menu"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    class="euiIcon euiIcon--medium euiButtonIcon__icon"
                    focusable="false"
                    role="img"
                    aria-hidden="true"
                  >
                    <path d="M.164 10.329L1.87 8 .163 5.67c.18-.601.43-1.19.758-1.757a8.197 8.197 0 011.142-1.535l2.872.313L6.099.05a8.166 8.166 0 013.8-.003l1.166 2.644 2.872-.313a8.166 8.166 0 011.899 3.293L14.13 8l1.706 2.33c-.18.601-.43 1.19-.758 1.757a8.197 8.197 0 01-1.142 1.535l-2.872-.313-1.164 2.641a8.166 8.166 0 01-3.8.003l-1.166-2.644-2.872.313a8.166 8.166 0 01-1.899-3.293zm4.663 1.986a1 1 0 011.023.591l.957 2.17c.79.134 1.597.132 2.387-.001l.956-2.169a1 1 0 011.023-.59l2.358.256a7.23 7.23 0 001.194-2.068l-1.401-1.913a1 1 0 010-1.182l1.4-1.912a7.165 7.165 0 00-1.192-2.069l-2.359.257a1 1 0 01-1.023-.591L9.193.924a7.165 7.165 0 00-2.387.001L5.85 3.094a1 1 0 01-1.023.59l-2.358-.256a7.23 7.23 0 00-1.194 2.068l1.401 1.913a1 1 0 010 1.182l-1.4 1.912c.28.751.681 1.45 1.192 2.069l2.359-.257zM8 11a3 3 0 110-6 3 3 0 010 6zm0-1a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="euiSpacer euiSpacer--m"></div>
        <div class="guideSideNav__search">
          <div class="euiFormControlLayout">
            <div class="euiFormControlLayout__childrenWrapper">
              <input
                type="search"
                placeholder="Search"
                class="euiFieldSearch"
                aria-label="Search for a docs section"
                value=""
              />
              <div class="euiFormControlLayoutIcons">
                <span class="euiFormControlLayoutCustomIcon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    class="euiIcon euiIcon--medium euiFormControlLayoutCustomIcon__icon"
                    focusable="false"
                    role="img"
                    aria-hidden="true"
                  >
                    <path d="M11.271 11.978l3.872 3.873a.502.502 0 00.708 0 .502.502 0 000-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532-2.73-2.73-7.17-2.73-9.898 0-2.728 2.729-2.728 7.17 0 9.9a6.955 6.955 0 004.949 2.05.5.5 0 000-1 5.96 5.96 0 01-4.242-1.757 6.01 6.01 0 010-8.486c2.337-2.34 6.143-2.34 8.484 0a6.01 6.01 0 010 8.486.5.5 0 00.034.738z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
