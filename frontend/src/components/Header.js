import {
  EuiAvatar,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiOverlayMask,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiShowFor,
  EuiSpacer,
  EuiText,
  EuiToolTip,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import { listProducts } from "../actions/productActions.js";
import { logout } from "../actions/userActions";
import { useLocation } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Logo from "./Logo";

export default ({
  theme,
  isCartPopoverOpen,
  setIsCartPopoverOpen,
  closeCartPopover,
}) => {
  const history = useHistory();

  useEffect(() => {
    document.body.classList.add("guideBody--overflowHidden");
    document.body.classList.add("euiBody--headerIsFixed--double");

    return () => {
      document.body.classList.remove("guideBody--overflowHidden");
      document.body.classList.remove("euiBody--headerIsFixed--double");
    };
  }, []);

  /**
   * Header App Menu
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const HeaderAppMenu = ({ history }) => {
    const idGenerator = htmlIdGenerator();
    const popoverId = idGenerator("popover");
    const keypadId = idGenerator("keypad");

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const onMenuButtonClick = () => {
      setIsOpen(!isOpen);
    };
    const logoutHandler = () => {
      dispatch(logout());
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    const button = (
      <EuiToolTip position="bottom" delay="long" content="More Stuff">
        <EuiHeaderSectionItemButton
          aria-controls={keypadId}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Apps menu with 1 new app"
          onClick={onMenuButtonClick}
        >
          <EuiShowFor sizes={["xs", "s", "m"]}>
            <EuiIcon type="menu" size="lg" />
          </EuiShowFor>
          <EuiShowFor sizes={[, "l", "xl"]}>
            <svg
              class="tw-w-5 tw-h-5 tw-text-gray-800 tw-mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </EuiShowFor>
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );

    return (
      <EuiPopover
        id={popoverId}
        button={button}
        isOpen={isOpen}
        anchorPosition="downRight"
        closePopover={closeMenu}
      >
        <EuiKeyPadMenu id={keypadId} style={{ width: 288 }}>
          <EuiKeyPadMenuItem
            label="Order history"
            onClick={(e) => {
              history.push("/profile");
              closeMenu();
            }}
          >
            <EuiIcon type="sqlApp" size="l" />
          </EuiKeyPadMenuItem>

          {userInfo && userInfo.isAdmin && (
            <>
              <EuiKeyPadMenuItem
                label="All products"
                onClick={(e) => {
                  history.push("/admin/productlist");
                  closeMenu();
                }}
              >
                <EuiIcon type="indexSettings" size="l" />
              </EuiKeyPadMenuItem>
            </>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <EuiKeyPadMenuItem
                label="Store orders"
                onClick={(e) => {
                  history.push("/admin/orderlist");
                  closeMenu();
                }}
              >
                <EuiIcon type="tag" size="l" />
              </EuiKeyPadMenuItem>
            </>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <EuiKeyPadMenuItem
                label="All users"
                onClick={(e) => {
                  history.push("/admin/userlist");
                  closeMenu();
                }}
              >
                <EuiIcon type="users" size="l" />
              </EuiKeyPadMenuItem>
            </>
          )}
          <EuiKeyPadMenuItem
            label="Settings"
            onClick={(e) => {
              history.push("/settings");
              closeMenu();
            }}
          >
            <EuiIcon type="gear" size="l" />
          </EuiKeyPadMenuItem>
          <EuiKeyPadMenuItem
            label="Logout"
            onClick={(e) => {
              logoutHandler();
              closeMenu();
            }}
          >
            <EuiIcon type="lock" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
    );
  };

  /**
   * User Menu
   */
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const HeaderUserMenu = ({ history }) => {
    const id = htmlIdGenerator()();
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
      dispatch(logout());
    };

    const onMenuButtonClick = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    const button = (
      <EuiToolTip position="bottom" delay="long" content="User Profile">
        <EuiHeaderSectionItemButton
          aria-controls={id}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Account menu"
          onClick={onMenuButtonClick}
        >
          {/* <EuiIcon type="user" size="l" style={{ padding: "3px" }} /> */}
          <svg
            class="tw-w-5 tw-h-5 tw-mx-auto  tw-text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );

    return (
      <EuiPopover
        id={id}
        // ownFocus
        button={button}
        isOpen={isOpen}
        anchorPosition="downRight"
        closePopover={closeMenu}
        panelPaddingSize="none"
      >
        <div style={{ width: 320 }}>
          <EuiFlexGroup
            gutterSize="m"
            className="euiHeaderProfile"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              <svg
                class="tw-h-16 tw-h-16 tw-mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiText>
                <p>{userInfo && userInfo.name}</p>
              </EuiText>

              <EuiSpacer size="m" />

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiLink
                        onClick={(e) => {
                          history.push("/profile");
                          closeMenu();
                        }}
                        className="tw-text-gray-800 tw-border tw-font-medium tw-text-xs tw-rounded  "
                      >
                        Edit profile
                      </EuiLink>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                      {userInfo ? (
                        <EuiLink
                          onClick={(e) => {
                            logoutHandler();
                            history.push("/login");
                            closeMenu();
                          }}
                          className="tw-text-gray-800 tw-text-xs  tw-font-medium"
                        >
                          Log out
                        </EuiLink>
                      ) : (
                        <EuiLink
                          onClick={(e) => {
                            history.push("/login");
                            closeMenu();
                          }}
                        >
                          Sign In
                        </EuiLink>
                      )}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    );
  };

  /**
   * Spaces Menu
   */
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);
  const HeaderSpacesMenu = ({ history }) => {
    const id = htmlIdGenerator()();
    const spacesValues = [
      {
        label: "Product Manager",
        prepend: <EuiAvatar type="space" name="Product Manager" size="s" />,
        onClick: () => {
          history.push("/admin/productlist");
          closePopover();
        },
      },
      {
        label: "Order Manager",
        prepend: <EuiAvatar type="space" name="Order Manager" size="s" />,
        onClick: () => {
          history.push("/admin/orderlist");
          closePopover();
        },
      },
      {
        label: "Sales team",
        prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
        // checked: "on",
        onClick: () => {
          history.push("/admin/userlist");
          closePopover();
        },
      },
    ];

    const additionalSpaces = [
      {
        label: "Sales team 2",
        prepend: <EuiAvatar type="space" name="Sales Team 2" size="s" />,
      },
      {
        label: "Engineering 2",
        prepend: <EuiAvatar type="space" name="Engineering 2" size="s" />,
      },
      {
        label: "Security 2",
        prepend: <EuiAvatar type="space" name="Security 2" size="s" />,
      },
      {
        label: "Default 2",
        prepend: <EuiAvatar type="space" name="Default 2" size="s" />,
      },
    ];

    const [spaces, setSpaces] = useState(spacesValues);
    const [selectedSpace, setSelectedSpace] = useState(
      spaces.filter((option) => option.checked)[0]
    );
    const [isOpen, setIsOpen] = useState(false);

    const isListExtended = () => {
      return spaces.length > 4 ? true : false;
    };

    const onMenuButtonClick = () => {
      setIsOpen(!isOpen);
    };

    const closePopover = () => {
      setIsOpen(false);
    };

    const onChange = (options) => {
      setSpaces(options);
      setSelectedSpace(options.filter((option) => option.checked)[0]);
      setIsOpen(false);
    };

    const addMoreSpaces = () => {
      setSpaces(spaces.concat(additionalSpaces));
    };

    const button = (
      <EuiToolTip position="left" delay="long" content="Farm Manager">
        <EuiHeaderSectionItemButton
          aria-controls={id}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Spaces menu"
          onClick={onMenuButtonClick}
        >
          <svg
            class="tw-w-5 tw-h-5 tw-mx-auto tw-text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );

    return (
      <EuiPopover
        id={id}
        button={button}
        isOpen={isOpen}
        anchorPosition="downRight"
        closePopover={closePopover}
        panelPaddingSize="none"
      >
        <EuiSelectable
          searchable={isListExtended()}
          searchProps={{
            placeholder: "Find a space",
            compressed: true,
          }}
          options={spaces}
          singleSelection="always"
          style={{ width: 300 }}
          onChange={onChange}
          listProps={{
            rowHeight: 40,
            showIcons: false,
          }}
        >
          {(list, search) => (
            <>
              <EuiPopoverTitle paddingSize="s">
                {search || "Farm Manager"}
              </EuiPopoverTitle>
              {list}
              <EuiPopoverFooter paddingSize="s">
                <EuiButton
                  size="s"
                  fullWidth
                  onClick={addMoreSpaces}
                  disabled={true}
                >
                  Add more spaces
                </EuiButton>
              </EuiPopoverFooter>
            </>
          )}
        </EuiSelectable>
      </EuiPopover>
    );
  };

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  /**
   * Sitewide search
   */

  const search = (
    <Route
      render={({ history }) => (
        <SearchBox
          history={history}
          products={products}
          loading={loading}
          fullWidth
        />
      )}
    />
  );

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const reload = () => {
    dispatch(listProducts("", 1));
  };

  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register")
    return null;

  return (
    <>
      {/* FocusTrap for Docs only */}
      <>
        <EuiShowFor sizes={["l", "xl"]}>
          <EuiHeader
            onProgress
            position="static"
            className="xl:tw-px-0 tw-px-4 tw-h-36 tw-text-gray-900 tw-font-sans tw-antialiased tw-leading-tight"
            borderBottom="none"
            style={{
              boxShadow: "none!important",
            }}
          >
            <span
              style={{ maxWidth: "75rem" }}
              className="tw-flex tw-justify-between  lg:tw-px-4 xl:tw-px-8 tw-items-center tw-w-full tw-mx-auto"
            >
              <EuiHeaderSection>
                <EuiShowFor sizes={["m", "l", "xl"]}>
                  <div className="tw-mt-5" onClick={() => reload()}>
                    <Logo history={history} />
                  </div>
                </EuiShowFor>

                <div className="tw-ml-6 tw-w-full" grow>
                  {products && search}
                </div>
              </EuiHeaderSection>

              <EuiHeaderSection>
                {
                  (userInfo && userInfo.isAdmin && (
                    <HeaderSpacesMenu history={history} />
                  ),
                  (
                    <EuiPopover
                      button={
                        <EuiHeaderSectionItemButton
                          aria-expanded={isOpen}
                          notification={cartItems.length}
                          aria-haspopup="true"
                          aria-label="Apps menu with 1 new app"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/cart");
                          }}
                        >
                          <EuiShowFor sizes={["xs", "s", "m"]}>
                            <EuiIcon
                              type="menu"
                              className="tw-invisible"
                              size="l"
                              style={{ padding: "3px" }}
                            />
                          </EuiShowFor>
                          <EuiShowFor sizes={["l", "xl"]}>
                            <svg
                              className="tw-w-5 tw-h-5 tw-mx-auto tw-text-gray-800"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                            </svg>
                          </EuiShowFor>
                        </EuiHeaderSectionItemButton>
                      }
                      isOpen={isCartPopoverOpen}
                      closePopover={closeCartPopover}
                      anchorPosition="downRight"
                      panelClassName="tw-px-0 tw-shadow-lg"
                    >
                      <EuiPopoverTitle className=" tw-pt-5 tw-border-none ">
                        <div className="tw-flex tw-justify-between">
                          <span className="tw-text-xl   tw-normal-case tw-px-4 tw-text-gray-800">
                            Added to cart!
                          </span>
                          <div onClick={closeCartPopover}>
                            <svg
                              class="tw-w-6 tw-h-6 tw-mr-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <EuiHorizontalRule
                          className="tw-bg-gray-200 tw-mt-5"
                          margin="none"
                        />
                      </EuiPopoverTitle>
                      <div style={{ width: "365px" }}>
                        {cartItems &&
                          cartItems.map((item) => <CartItem item={item} />)}
                      </div>
                      <EuiPopoverFooter className="tw-border-none">
                        <div className="tw-mx-4 tw-pb-1">
                          <EuiButton
                            fullWidth
                            fill
                            color="secondary"
                            onClick={() => {
                              history.push("/cart");
                              closeCartPopover();
                            }}
                            className="tw-text-sm tw-font-bold"
                            size="m"
                          >
                            View cart
                          </EuiButton>
                        </div>
                      </EuiPopoverFooter>
                    </EuiPopover>
                  ))
                }
                {userInfo ? (
                  <>
                    {/* <HeaderUserMenu history={history} /> */}
                    <HeaderAppMenu history={history} />
                  </>
                ) : (
                  <>
                    <EuiHeaderSectionItemButton
                      className="tw-no-underline tw-px-4 focus:tw-bg-white focus:tw-outline-none"
                      onClick={(e) => {
                        history.push("/login");
                      }}
                    >
                      <span className="tw-py-1 tw-font-bold tw-text-xs tw-text-gray-700  ">
                        Log in
                      </span>
                    </EuiHeaderSectionItemButton>
                    <EuiHeaderSectionItemButton
                      className="tw-no-underline focus:tw-bg-white focus:tw-outline-none"
                      onClick={(e) => {
                        history.push("/register");
                      }}
                    >
                      <button className="tw-bg-teal-700 tw-rounded-full tw-text-white tw-font-bold tw-px-3 tw-py-2 tw-text-xs ">
                        Sign Up
                      </button>
                    </EuiHeaderSectionItemButton>
                  </>
                )}
              </EuiHeaderSection>
            </span>
          </EuiHeader>
        </EuiShowFor>
        <EuiShowFor sizes={["xs", "s", "m"]}>
          <EuiHeader
            theme="light"
            style={{ border: "none" }}
            className="tw-px-1"
            position={"fixed"}
            menu
          >
            <EuiHeaderSectionItem border="right">
              <HeaderAppMenu history={history} />
              {!userInfo && (
                <>
                  <EuiLink
                    className="tw-no-underline tw-invisible focus:tw-bg-white focus:tw-outline-none"
                    onClick={(e) => {
                      history.push("/login");
                    }}
                  >
                    <span className="tw-py-1 tw-font-bold tw-text-xs tw-mr-2 tw-text-gray-700  ">
                      Log in
                    </span>
                  </EuiLink>

                  <EuiLink
                    className="tw-no-underline tw-invisible focus:tw-bg-white focus:tw-outline-none"
                    onClick={(e) => {
                      history.push("/register");
                    }}
                  >
                    <span className="tw-bg-teal-700 tw-rounded-full tw-text-white tw-font-bold tw-px-3 tw-py- tw-text-xs  ">
                      Sign Up
                    </span>
                  </EuiLink>
                </>
              )}
            </EuiHeaderSectionItem>

            {/* <EuiHeaderLink>Code</EuiHeaderLink> */}
            <EuiHeaderSectionItem
              onClick={(e) => history.push("/")}
              border="center"
            >
              <EuiIcon
                type="/images/shopping.svg"
                className="tw-bg-gray-300  tw-rounded-full  tw-h-8 tw-p-1 tw-w-8"
              ></EuiIcon>
            </EuiHeaderSectionItem>

            <EuiHeaderSectionItem>
              {!userInfo && (
                <>
                  <EuiHeaderSectionItemButton
                    className="tw-no-underline tw-pr-2 ad focus:tw-bg-white focus:tw-outline-none"
                    onClick={(e) => {
                      history.push("/login");
                    }}
                  >
                    <span className="tw-py-1 sm:tw-px-2 tw-font-bold tw-text-xs tw-whitespace-no-wrap tw-text-gray-700  ">
                      Log in
                    </span>
                  </EuiHeaderSectionItemButton>

                  <EuiHeaderSectionItemButton
                    className="tw-no-underline  focus:tw-bg-white  focus:tw-outline-none"
                    onClick={(e) => {
                      history.push("/register");
                    }}
                  >
                    <button className="tw-bg-teal-700 tw-whitespace-no-wrap tw-rounded-full tw-text-white tw-font-bold tw-px-3 tw-py-2 tw-text-xs  ">
                      Sign Up
                    </button>
                  </EuiHeaderSectionItemButton>
                </>
              )}

              <EuiShowFor sizes={["s", "m", "l", "xl"]}>
                <EuiFlexItem grow={false}>
                  <EuiHeaderSectionItemButton
                    aria-haspopup="true"
                    aria-label="Apps menu with 1 new app"
                    notification={cartItems.length}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/cart");
                    }}
                  >
                    <svg
                      className="tw-w-5 tw-h-5 tw-mx-auto  tw-text-gray-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                    </svg>
                  </EuiHeaderSectionItemButton>
                </EuiFlexItem>
              </EuiShowFor>

              <EuiShowFor sizes={["xs"]}>
                <EuiHeaderSectionItemButton
                  aria-haspopup="true"
                  className="tw-font-sans sm:tw-mr-0 tw-mr-1"
                  aria-label="Apps menu with 1 new app"
                  notification={cartItems.length}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/cart");
                  }}
                >
                  <svg
                    className="tw-w-5 tw-h-5 tw-mx-auto tw-mr-3 tw-font-sans tw-text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                </EuiHeaderSectionItemButton>
              </EuiShowFor>
            </EuiHeaderSectionItem>
          </EuiHeader>
          <EuiShowFor sizes={["xs", "s", "m", "l"]}>
            <EuiHeader
              theme="light"
              style={{ height: 57, boxShadow: "none" }}
              className="tw-border-gray-300 tw-mt-12 tw-border-opacity-75"
              position="static"
            >
              <div className="tw-w-full tw-items-center tw-px-4 tw-max-h-10 tw-mt-1 tw-mb-2">
                {products && search}
              </div>
            </EuiHeader>
          </EuiShowFor>
        </EuiShowFor>
      </>
    </>
  );
};
