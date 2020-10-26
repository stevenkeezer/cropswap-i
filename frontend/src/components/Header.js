import {
  EuiAvatar,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiProgress,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiToolTip,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiShowFor,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";
import Logo from "./Logo";

export default ({ theme }) => {
  const history = useHistory();

  /**
   * FullScreen for docs only
   */
  const [fullScreen, setFullScreen] = useState(true);
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add("guideBody--overflowHidden");
      document.body.classList.add("euiBody--headerIsFixed--double");
    }
    return () => {
      document.body.classList.remove("guideBody--overflowHidden");
      document.body.classList.remove("euiBody--headerIsFixed--double");
    };
  }, [fullScreen]);

  /**
   * Collapsible Nav
   */
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  );

  /**
   * Header App Menu
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const HeaderAppMenu = ({ history }) => {
    const idGenerator = htmlIdGenerator();
    const popoverId = idGenerator("popover");
    const keypadId = idGenerator("keypad");

    const [isOpen, setIsOpen] = useState(false);

    const onMenuButtonClick = () => {
      setIsOpen(!isOpen);
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
          <svg
            class="tw-w-6 tw-h-6 tw-text-gray-800 tw-mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );

    return (
      <EuiPopover
        id={popoverId}
        // ownFocus
        button={button}
        isOpen={isOpen}
        anchorPosition="downRight"
        closePopover={closeMenu}
      >
        <EuiKeyPadMenu id={keypadId} style={{ width: 288 }}>
          <EuiKeyPadMenuItem
            label="Discover"
            onClick={(e) => {
              history.push("/");
              closeMenu();
            }}
          >
            <EuiIcon type={"discoverApp"} size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Orders"
            onClick={(e) => {
              history.push("/profile");
              closeMenu();
            }}
          >
            <EuiIcon type="dashboardApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Cart"
            onClick={(e) => {
              history.push("/cart");
              closeMenu();
            }}
          >
            <EuiIcon type="submodule" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Product List"
            onClick={(e) => {
              history.push("/admin/productlist");
              closeMenu();
            }}
          >
            <EuiIcon type="devToolsApp" size="l" />
          </EuiKeyPadMenuItem>
          <EuiKeyPadMenuItem
            label="Profile"
            onClick={(e) => {
              history.push("/profile");
              closeMenu();
            }}
          >
            <EuiIcon type="usersRolesApp" size="l" />
          </EuiKeyPadMenuItem>

          <a href="https://github.com/stevenkeezer/cropswap-i" target="_blank">
            <EuiKeyPadMenuItem label="Github">
              <EuiIcon type="logoGithub" size="l" />
            </EuiKeyPadMenuItem>
          </a>
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
          <svg
            class="tw-h-6 tw-h-6 tw-mx-auto tw-text-gray-800"
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
            class="tw-w-6 tw-h-6 tw-mx-auto tw-text-gray-800"
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
        // ownFocus
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

  /**
   * Sitewide search
   */
  const search = (
    <Route render={({ history }) => <SearchBox history={history} />} />
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      {/* FocusTrap for Docs only */}

      {fullScreen && (
        <>
          <EuiHeader
            onProgress
            className=" tw-mx-auto sm:px-0  tw-px-4 xl:tw-px-32 lg:tw-h-24 tw-h-16"
            borderBottom="none"
            style={{
              borderBottom: "1px solid white",
              boxShadow: "none!important",
            }}
            // theme="light"
            position="fixed"
            sections={[
              {
                items: [
                  <div className="xl:tw-mr-8 xl:tw-ml-6">
                    <Logo history={history} />
                  </div>,

                  <EuiShowFor fullWidth sizes={["m", "l", "xl"]}>
                    {search}
                  </EuiShowFor>,
                  <EuiShowFor sizes={["xs", "s"]}>{search}</EuiShowFor>,
                ],
                borders: "none",
              },

              {
                items: [
                  userInfo && userInfo.isAdmin && (
                    <HeaderSpacesMenu history={history} />
                  ),
                  <EuiHeaderSectionItemButton
                    aria-haspopup="true"
                    aria-label="Apps menu with 1 new app"
                    notification={cartItems.length}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/cart");
                    }}
                  >
                    <EuiToolTip
                      position="bottom"
                      delay="long"
                      content="My Cart"
                    >
                      <svg
                        class="tw-w-6 tw-h-6 tw-mx-auto tw-text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                      </svg>
                    </EuiToolTip>
                  </EuiHeaderSectionItemButton>,

                  userInfo ? (
                    <>
                      <HeaderUserMenu history={history} />
                      <HeaderAppMenu history={history} />
                    </>
                  ) : (
                    <>
                      <EuiLink
                        className="tw-no-underline tw-px-4 focus:tw-bg-white focus:tw-outline-none"
                        onClick={(e) => {
                          history.push("/login");
                        }}
                      >
                        <span className="tw-py-1 tw-font-bold tw-text-xs tw-text-gray-700  ">
                          Log in
                        </span>
                      </EuiLink>
                      <EuiLink
                        className="tw-no-underline focus:tw-bg-white focus:tw-outline-none"
                        onClick={(e) => {
                          history.push("/register");
                        }}
                      >
                        <span className="tw-bg-teal-700 tw-rounded-full tw-text-white tw-font-bold tw-px-3 tw-py-2 tw-text-xs tw-py-1 ">
                          Sign Up
                        </span>
                      </EuiLink>
                    </>
                  ),
                ],
                borders: "none",
              },
            ]}
          />
        </>
      )}
    </>
  );
};
