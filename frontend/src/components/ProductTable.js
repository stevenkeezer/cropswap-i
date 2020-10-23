import React, { useState, Fragment } from "react";
import ElasticImage from "../components/ElasticImage";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
  EuiBadge,
  EuiFlexGrid,
} from "@elastic/eui";

import {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from "@elastic/eui/lib/services";

const ProductTable = ({ products, deleteHandler, history }) => {
  return (
    <>
      <div class="euiBasicTable ">
        <div>
          <div class="euiTableHeaderMobile">
            <div class="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--alignItemsBaseline euiFlexGroup--justifyContentSpaceBetween euiFlexGroup--directionRow">
              <div class="euiFlexItem euiFlexItem--flexGrowZero">
                <div class="euiCheckbox">
                  <input
                    class="euiCheckbox__input"
                    type="checkbox"
                    id="_selection_column-checkbox_i4ba6f501-13ea-11eb-a273-5b026e5e2741"
                    aria-label="Select all rows"
                  />
                  <div class="euiCheckbox__square"></div>
                  <label
                    class="euiCheckbox__label"
                    for="_selection_column-checkbox_i4ba6f501-13ea-11eb-a273-5b026e5e2741"
                  >
                    Select all rows
                  </label>
                </div>
              </div>
              <div class="euiFlexItem euiFlexItem--flexGrowZero">
                <div class="euiTableSortMobile">
                  <div class="euiPopover euiPopover--anchorDownRight">
                    <div class="euiPopover__anchor">
                      <button
                        class="euiButtonEmpty euiButtonEmpty--primary euiButtonEmpty--xSmall euiButtonEmpty--flushRight"
                        type="button"
                      >
                        <span class="euiButtonContent euiButtonContent--iconRight euiButtonEmpty__content">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                            class="euiIcon euiIcon--medium euiButtonContent__icon"
                            focusable="false"
                            role="img"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="non-zero"
                              d="M13.069 5.157L8.384 9.768a.546.546 0 01-.768 0L2.93 5.158a.552.552 0 00-.771 0 .53.53 0 000 .759l4.684 4.61c.641.631 1.672.63 2.312 0l4.684-4.61a.53.53 0 000-.76.552.552 0 00-.771 0z"
                            ></path>
                          </svg>
                          <span class="euiButtonEmpty__text">Sorting</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table
            tabindex="-1"
            class="euiTable euiTable--responsive"
            id="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
          >
            <caption class="euiScreenReaderOnly euiTableCaption"></caption>
            <thead>
              <tr>
                <th class="euiTableHeaderCellCheckbox" scope="col">
                  <div class="euiTableCellContent">
                    <div class="euiCheckbox euiCheckbox--inList euiCheckbox--noLabel">
                      <input
                        class="euiCheckbox__input"
                        type="checkbox"
                        id="_selection_column-checkbox_i4ba71c14-13ea-11eb-a273-5b026e5e2741"
                        data-test-subj="checkboxSelectAll"
                        aria-label="Select all rows"
                      />
                      <div class="euiCheckbox__square"></div>
                    </div>
                  </div>
                </th>
                <th
                  class="euiTableHeaderCell euiTableHeaderCell--hideForMobile"
                  scope="col"
                  role="columnheader"
                  aria-sort="ascending"
                  aria-live="polite"
                  data-test-subj="tableHeaderCell_firstName_0"
                >
                  <button
                    type="button"
                    class="euiTableHeaderButton euiTableHeaderButton-isSorted"
                    data-test-subj="tableHeaderSortButton"
                  >
                    <span class="euiTableCellContent">
                      <span
                        title="[object Object]"
                        class="euiTableCellContent__text"
                      >
                        Item
                      </span>

                      <span class="euiScreenReaderOnly">
                        Click to sort in descending order
                      </span>
                    </span>
                  </button>
                </th>
                <th
                  class="euiTableHeaderCell euiTableHeaderCell--hideForMobile"
                  scope="col"
                  role="columnheader"
                  data-test-subj="tableHeaderCell_lastName_1"
                >
                  <div class="euiTableCellContent">
                    <span class="euiTableCellContent__text">Name</span>
                  </div>
                </th>
                <th
                  class="euiTableHeaderCell"
                  scope="col"
                  role="columnheader"
                  data-test-subj="tableHeaderCell_github_2"
                >
                  <div class="euiTableCellContent">
                    <span class="euiTableCellContent__text">Price</span>
                  </div>
                </th>
                <th
                  class="euiTableHeaderCell"
                  scope="col"
                  role="columnheader"
                  aria-sort="none"
                  aria-live="polite"
                  data-test-subj="tableHeaderCell_dateOfBirth_3"
                >
                  <button
                    type="button"
                    class="euiTableHeaderButton"
                    data-test-subj="tableHeaderSortButton"
                  >
                    <span class="euiTableCellContent">
                      <span class="euiTableCellContent__text">Brand</span>
                      <span class="euiScreenReaderOnly">
                        Click to sort in ascending order
                      </span>
                    </span>
                  </button>
                </th>
                <th
                  class="euiTableHeaderCell"
                  scope="col"
                  role="columnheader"
                  data-test-subj="tableHeaderCell_nationality_4"
                >
                  <div class="euiTableCellContent">
                    <span class="euiTableCellContent__text">Category</span>
                  </div>
                </th>
                <th
                  class="euiTableHeaderCell"
                  scope="col"
                  role="columnheader"
                  aria-sort="none"
                  aria-live="polite"
                  data-test-subj="tableHeaderCell_online_5"
                >
                  <button
                    type="button"
                    class="euiTableHeaderButton"
                    data-test-subj="tableHeaderSortButton"
                  >
                    <span class="euiTableCellContent">
                      <span class="euiTableCellContent__text">Stock</span>
                      <span class="euiScreenReaderOnly">
                        Click to sort in ascending order
                      </span>
                    </span>
                  </button>
                </th>
                <th class="euiTableHeaderCell" scope="col" role="columnheader">
                  <div class="euiTableCellContent euiTableCellContent--alignRight">
                    <span class="euiTableCellContent__text">Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr class="euiTableRow euiTableRow-isSelectable euiTableRow-hasActions">
                    <td class="euiTableRowCellCheckbox">
                      <div class="euiTableCellContent">
                        <div class="euiCheckbox euiCheckbox--inList euiCheckbox--noLabel">
                          <input
                            class="euiCheckbox__input"
                            type="checkbox"
                            id="_selection_column_1-checkbox"
                            disabled=""
                            title="User is currently offline"
                            aria-label="User is currently offline"
                            data-test-subj="checkboxSelectRow-1"
                          />
                          <div class="euiCheckbox__square"></div>
                        </div>
                      </div>
                    </td>
                    <td class="euiTableRowCell euiTableRowCell--enlargeForMobile euiTableRowCell--isMobileFullWidth">
                      <div class="euiTableCellContent euiTableCellContent--truncateText euiTableCellContent--overflowingContent euiTableRowCell--hideForDesktop">
                        <span class="euiTableCellContent__text">
                          <div class="tw-flex tw-items-center ">
                            {/* <ElasticImage
                              image={product.image}
                              name={product.name}
                            /> */}
                            <img
                              class="tw-border tw-border-white tw-object-cover tw-h-16 tw-w-16 tw-rounded tw-relative"
                              alt={product.name}
                              src={product.image}
                            />
                          </div>
                        </span>
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--truncateText euiTableRowCell--hideForMobile">
                        <span class="euiTableCellContent__text">
                          <div class="tw-flex tw-items-center ">
                            <img
                              class="tw-border  tw-border-white tw-object-cover tw-h-16 tw-w-16 tw-rounded tw-relative"
                              alt={product.name}
                              src={product.image}
                            />
                          </div>
                        </span>
                      </div>
                    </td>
                    <td class="euiTableRowCell euiTableRowCell--hideForMobile">
                      <div class="euiTableCellContent euiTableCellContent--truncateText">
                        <span class="euiTableCellContent__text">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Price
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        <a
                          class="euiLink euiLink--primary"
                          href="https://github.com/elissaw"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ${product.price}
                        </a>
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Product Name
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        {product.brand}
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Category
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        {product.category}
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Online
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        <div class="euiHealth">
                          <div class="euiFlexGroup euiFlexGroup--gutterExtraSmall euiFlexGroup--alignItemsCenter euiFlexGroup--directionRow">
                            <div class="euiFlexItem euiFlexItem--flexGrowZero"></div>
                            <div class="euiFlexItem euiFlexItem--flexGrowZero">
                              <EuiFlexItem grow={false}>
                                <span>
                                  <EuiBadge
                                    color={
                                      euiPaletteColorBlindBehindText({
                                        sortBy: "warm",
                                      })[8]
                                    }
                                  >
                                    <span className="tw-text-red-100 tw-font-medium">
                                      {product.countInStock} left in stock
                                    </span>
                                  </EuiBadge>
                                </span>
                              </EuiFlexItem>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="euiTableRowCell euiTableRowCell--hasActions">
                      <div class="euiTableCellContent euiTableCellContent--alignRight euiTableCellContent--showOnHover euiTableCellContent--overflowingContent">
                        <span class="euiToolTipAnchor">
                          <button
                            class="euiButtonIcon euiButtonIcon--primary euiTableCellContent__hoverItem"
                            onClick={(e) =>
                              history.push(`/admin/product/${product._id}/edit`)
                            }
                            type="button"
                            aria-labelledby="i4ba79141-13ea-11eb-a273-5b026e5e2741"
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
                              <path d="M11.4 0c.235 0 .46.099.622.273l2.743 3c.151.162.235.378.235.602v9.25a.867.867 0 01-.857.875H3.857A.867.867 0 013 13.125V.875C3 .392 3.384 0 3.857 0H11.4zM14 4h-2.6a.4.4 0 01-.4-.4V1H4v12h10V4z"></path>
                              <path d="M3 1H2a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1v-1h-1v1H2V2h1V1z"></path>
                            </svg>
                          </button>

                          <span
                            id="i4ba79141-13ea-11eb-a273-5b026e5e2741"
                            class="euiScreenReaderOnly"
                          >
                            Clone
                          </span>
                        </span>
                        <span class="euiToolTipAnchor">
                          <button
                            class="euiButtonIcon euiButtonIcon--danger euiTableCellContent__hoverItem"
                            onClick={() => deleteHandler(product._id)}
                            type="button"
                            aria-labelledby="i4ba7b851-13ea-11eb-a273-5b026e5e2741"
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
                              <path d="M11 3h5v1H0V3h5V1a1 1 0 011-1h4a1 1 0 011 1v2zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632l.312 2zM6 3h4V1H6v2z"></path>
                            </svg>
                          </button>
                          <span
                            id="i4ba7b851-13ea-11eb-a273-5b026e5e2741"
                            class="euiScreenReaderOnly"
                          >
                            Delete
                          </span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <div class="euiSpacer euiSpacer--m"></div>
          <div class="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--alignItemsCenter euiFlexGroup--justifyContentSpaceBetween euiFlexGroup--directionRow">
            <div class="euiFlexItem euiFlexItem--flexGrowZero">
              <div class="euiPopover euiPopover--anchorUpRight">
                <div class="euiPopover__anchor">
                  <button
                    class="euiButtonEmpty euiButtonEmpty--text euiButtonEmpty--xSmall"
                    type="button"
                    data-test-subj="tablePaginationPopoverButton"
                  >
                    <span class="euiButtonContent euiButtonContent--iconRight euiButtonEmpty__content">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="euiIcon euiIcon--medium euiButtonContent__icon"
                        focusable="false"
                        role="img"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="non-zero"
                          d="M13.069 5.157L8.384 9.768a.546.546 0 01-.768 0L2.93 5.158a.552.552 0 00-.771 0 .53.53 0 000 .759l4.684 4.61c.641.631 1.672.63 2.312 0l4.684-4.61a.53.53 0 000-.76.552.552 0 00-.771 0z"
                        ></path>
                      </svg>
                      <span class="euiButtonEmpty__text">Rows per page: 5</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div class="euiFlexItem euiFlexItem--flexGrowZero">
              <nav class="euiPagination">
                <button
                  disabled=""
                  class="euiButtonIcon euiButtonIcon--text"
                  type="button"
                  aria-label="Previous page"
                  data-test-subj="pagination-button-previous"
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
                    <path
                      fill-rule="nonzero"
                      d="M10.843 13.069L6.232 8.384a.546.546 0 010-.768l4.61-4.685a.552.552 0 000-.771.53.53 0 00-.759 0l-4.61 4.684a1.65 1.65 0 000 2.312l4.61 4.684a.53.53 0 00.76 0 .552.552 0 000-.771z"
                    ></path>
                  </svg>
                </button>
                <ul class="euiPagination__list">
                  <li class="euiPagination__item">
                    <button
                      disabled=""
                      class="euiButtonEmpty euiButtonEmpty--text euiButtonEmpty--xSmall euiButtonEmpty-isDisabled euiPaginationButton euiPaginationButton-isActive euiPaginationButton--hideOnMobile"
                      type="button"
                      aria-label="Page 1 of 4"
                      data-test-subj="pagination-button-0"
                      aria-current="true"
                      aria-controls="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                    >
                      <span class="euiButtonContent euiButtonEmpty__content">
                        <span class="euiButtonEmpty__text">1</span>
                      </span>
                    </button>
                  </li>
                  <li class="euiPagination__item">
                    <a
                      class="euiButtonEmpty euiButtonEmpty--text euiButtonEmpty--xSmall euiPaginationButton euiPaginationButton--hideOnMobile"
                      href="#__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                      rel="noreferrer"
                      aria-label="Page 2 of 4"
                      data-test-subj="pagination-button-1"
                      aria-controls="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                    >
                      <span class="euiButtonContent euiButtonEmpty__content">
                        <span class="euiButtonEmpty__text">2</span>
                      </span>
                    </a>
                  </li>
                  <li class="euiPagination__item">
                    <a
                      class="euiButtonEmpty euiButtonEmpty--text euiButtonEmpty--xSmall euiPaginationButton euiPaginationButton--hideOnMobile"
                      href="#__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                      rel="noreferrer"
                      aria-label="Page 3 of 4"
                      data-test-subj="pagination-button-2"
                      aria-controls="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                    >
                      <span class="euiButtonContent euiButtonEmpty__content">
                        <span class="euiButtonEmpty__text">3</span>
                      </span>
                    </a>
                  </li>
                  <li class="euiPagination__item">
                    <a
                      class="euiButtonEmpty euiButtonEmpty--text euiButtonEmpty--xSmall euiPaginationButton euiPaginationButton--hideOnMobile"
                      href="#__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                      rel="noreferrer"
                      aria-label="Page 4 of 4"
                      data-test-subj="pagination-button-3"
                      aria-controls="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                    >
                      <span class="euiButtonContent euiButtonEmpty__content">
                        <span class="euiButtonEmpty__text">4</span>
                      </span>
                    </a>
                  </li>
                </ul>
                <a
                  class="euiButtonIcon euiButtonIcon--text"
                  href="#__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
                  rel="noreferrer"
                  aria-label="Next page, 2"
                  data-test-subj="pagination-button-next"
                  aria-controls="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
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
                    <path
                      fill-rule="nonzero"
                      d="M5.157 13.069l4.611-4.685a.546.546 0 000-.768L5.158 2.93a.552.552 0 010-.771.53.53 0 01.759 0l4.61 4.684c.631.641.63 1.672 0 2.312l-4.61 4.684a.53.53 0 01-.76 0 .552.552 0 010-.771z"
                    ></path>
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
