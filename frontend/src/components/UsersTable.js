import React, { useState, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Table, Button, Container } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  checkmarkOutline,
  trashOutline,
  createOutline,
  closeOutline,
} from "ionicons/icons";

const OrderTable = ({ users, deleteHandler, history }) => {
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
                        Avatar
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="euiIcon euiIcon--medium euiTableSortIcon"
                        focusable="false"
                        role="img"
                        aria-label="Sorted in ascending order"
                      >
                        <path d="M8 4.207v8.237c0 .307-.224.556-.5.556s-.5-.249-.5-.556V4.207L2.904 8.303a.5.5 0 01-.707-.707l4.242-4.242a1.5 1.5 0 012.122 0l4.242 4.242a.5.5 0 11-.707.707L8 4.207z"></path>
                      </svg>
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
                    <span class="euiTableCellContent__text">User</span>
                  </div>
                </th>
                <th
                  class="euiTableHeaderCell"
                  scope="col"
                  role="columnheader"
                  data-test-subj="tableHeaderCell_github_2"
                >
                  <div class="euiTableCellContent">
                    <span class="euiTableCellContent__text">Email</span>
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
                      <span class="euiTableCellContent__text">User ID</span>
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
                    <span class="euiTableCellContent__text">Role</span>
                  </div>
                </th>

                <th class="euiTableHeaderCell" scope="col" role="columnheader">
                  <div class="euiTableCellContent euiTableCellContent--alignRight">
                    <span class="euiTableCellContent__text">Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
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
                          {/* <span>hi</span> */}
                        </span>
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--truncateText euiTableRowCell--hideForMobile">
                        <span class="euiTableCellContent__text">
                          <img
                            class="tw-w-10 tw-h-10 tw-rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            alt=""
                          />
                        </span>
                      </div>
                    </td>
                    <td class="euiTableRowCell euiTableRowCell--hideForMobile">
                      <div class="euiTableCellContent euiTableCellContent--truncateText">
                        <span class="euiTableCellContent__text">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Date
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        <a
                          class="euiLink euiLink--primary"
                          href="https://github.com/elissaw"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.email}
                        </a>
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Total
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        {user._id}
                      </div>
                    </td>
                    <td class="euiTableRowCell">
                      <div class="euiTableRowCell__mobileHeader euiTableRowCell--hideForDesktop">
                        Role
                      </div>
                      <div class="euiTableCellContent euiTableCellContent--overflowingContent">
                        {user && user.isAdmin ? (
                          <>
                            <span
                              aria-hidden
                              class=" tw-bg-green-200 tw-opacity-50 tw-rounded-full"
                            ></span>
                            <span class="tw-relative">Admin</span>
                          </>
                        ) : (
                          <>
                            <span
                              aria-hidden
                              class=" tw-bg-orange-200  tw-opacity-50 tw-rounded-full"
                            ></span>
                            <span class="tw-relative">User</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td class="euiTableRowCell euiTableRowCell--hasActions">
                      <div class="euiTableCellContent euiTableCellContent--alignRight euiTableCellContent--showOnHover euiTableCellContent--overflowingContent">
                        <span class="euiToolTipAnchor">
                          <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant="light" className="btn-sm">
                              <IonIcon
                                size="small"
                                icon={createOutline}
                              ></IonIcon>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(user._id)}
                          >
                            <IonIcon size="small" icon={trashOutline}></IonIcon>
                          </Button>
                          <span
                            id="i4ba79141-13ea-11eb-a273-5b026e5e2741"
                            class="euiScreenReaderOnly"
                          >
                            Clone
                          </span>
                        </span>
                        <span class="euiToolTipAnchor">
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

export default OrderTable;
