import React, { useState, Fragment } from "react";
import { EuiImage, EuiNotificationBadge } from "@elastic/eui";
import LazyImage from "./LazyImage";

const UserOrderTable = ({ orders, deleteHandler, history }) => {
  return (
    <>
      <div class="euiBasicTable ">
        <div>
          <table
            tabindex="-1"
            class="euiTable euiTable--responsive"
            id="__table_4ba6cdf1-13ea-11eb-a273-5b026e5e2741"
          >
            <caption class="euiScreenReaderOnly euiTableCaption"></caption>
            <thead className="tw-rounded-lg">
              <tr>
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
                        Items
                      </span>

                      <span class="euiScreenReaderOnly">
                        Click to sort in descending order
                      </span>
                    </span>
                  </button>
                </th>

                <th
                  class="euiTableHeaderCell"
                  scope="col"
                  role="columnheader"
                  data-test-subj="tableHeaderCell_github_2"
                >
                  <div class="euiTableCellContent">
                    <span class="euiTableCellContent__text">Order Date</span>
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
                      <span class="euiTableCellContent__text">Total</span>
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
                    <span class="euiTableCellContent__text">Paid</span>
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
                      <span class="euiTableCellContent__text">Delivered</span>
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
              {orders &&
                orders.map((order) => (
                  <>
                    <tr class="euiTableRow euiTableRow-isSelectable euiTableRow-hasActions tw-pl-2">
                      <td class="euiTableRowCell euiTableRowCell--enlargeForMobile euiTableRowCell--isMobileFullWidth">
                        <div class="euiTableCellContent euiTableCellContent--truncateText euiTableCellContent--overflowingContent euiTableRowCell--hideForDesktop">
                          <span class="euiTableCellContent__text">
                            <div class="tw-flex tw-items-center">
                              <LazyImage
                                src={order.orderItems[0].image}
                                alt={order.title}
                                height={75}
                              />
                            </div>
                          </span>
                        </div>
                        <div class="euiTableCellContent euiTableCellContent--truncateText euiTableRowCell--hideForMobile">
                          <LazyImage
                            src={order.orderItems[0].image}
                            alt={order.title}
                            height={75}
                          ></LazyImage>
                        </div>
                      </td>

                      <td class="euiTableRowCell">
                        <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                          Date
                        </div>
                        <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                          <div target="_blank" rel="noopener noreferrer">
                            {order.createdAt.substring(0, 10)}
                          </div>
                        </div>
                      </td>
                      <td class="euiTableRowCell">
                        <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                          Total
                        </div>
                        <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                          ${order.totalPrice}
                        </div>
                      </td>
                      <td class="euiTableRowCell">
                        <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                          Paid
                        </div>
                        <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                          {order.isPaid ? (
                            <span className="tw-bg-green-300  tw-bg-opacity-50 tw-px-2 tw-rounded-full tw-text-green-800 tw-text-xs tw-font-medium">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <div class="euiFlexItem euiFlexItem--flexGrowZero">
                              <span className="tw-bg-orange-300  tw-bg-opacity-50 tw-px-2 tw-rounded-full tw-text-orange-800 tw-text-xs tw-font-medium">
                                Not Paid
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td class="euiTableRowCell">
                        <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                          Delivered
                        </div>
                        <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                          <div class="euiHealth">
                            <div class="euiFlexGroup euiFlexGroup--gutterExtraSmall euiFlexGroup--alignItemsCenter euiFlexGroup--directionRow">
                              <div class="euiFlexItem euiFlexItem--flexGrowZero">
                                {order.isDelivered ? (
                                  <span className="tw-bg-green-300  tw-bg-opacity-50 tw-px-2 tw-rounded-full tw-text-green-800 tw-text-xs tw-font-medium">
                                    {order.deliveredAt.substring(0, 10)}
                                  </span>
                                ) : (
                                  <div class="euiFlexItem euiFlexItem--flexGrowZero">
                                    <span className="tw-bg-orange-300  tw-bg-opacity-50 tw-px-2 tw-rounded-full tw-text-orange-800 tw-text-xs tw-font-medium">
                                      Not delivered
                                    </span>
                                  </div>
                                )}
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
                              onClick={() =>
                                history.push(`/order/${order._id}`)
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
                        </div>
                      </td>
                    </tr>
                  </>
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

export default UserOrderTable;
