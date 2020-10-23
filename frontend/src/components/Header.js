import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../components/SearchBox";
import Logo from "./Logo";
import { useHistory } from "react-router";
import "@elastic/eui/dist/eui_theme_light.css";

import { htmlIdGenerator } from "@elastic/eui/lib/services";

import {
  EuiAvatar,
  EuiBadge,
  EuiButton,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFocusTrap,
  EuiHeader,
  EuiFlexGroup,
  EuiHeaderLink,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiSelectable,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiSpacer,
  EuiLink,
  EuiHeaderLinks,
  EuiIcon,
  EuiListGroupItem,
  EuiPage,
  EuiPopover,
  EuiPortal,
  EuiShowFor,
  EuiText,
  EuiTitle,
  EuiSelectableTemplateSitewide,
  EuiSelectableMessage,
} from "@elastic/eui";

import {
  basket,
  basketSharp,
  cogOutline,
  cogSharp,
  personCircleSharp,
  personCircleOutline,
  settingsOutline,
  storefront,
  storefrontOutline,
  storefrontSharp,
} from "ionicons/icons";
import AdminButton from "../components/AdminButton";

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
      <EuiHeaderSectionItemButton
        aria-controls={keypadId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Apps menu with 1 new app"
        onClick={onMenuButtonClick}
      >
        <EuiIcon type="apps" size="m" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id={popoverId}
        ownFocus
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
            <EuiIcon type="discoverApp" size="l" />
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

          <EuiKeyPadMenuItem label="Dev Tools">
            <EuiIcon type="devToolsApp" size="l" />
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

          <EuiKeyPadMenuItem label="Graph">
            <EuiIcon type="graphApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem label="Visualize">
            <EuiIcon type="visualizeApp" size="l" />
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
      <EuiHeaderSectionItemButton
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={onMenuButtonClick}
      >
        <svg
          class="tw-h-6 tw-h-6 tw-mx-auto"
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
    );

    return (
      <EuiPopover
        id={id}
        ownFocus
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
                      <EuiLink href="/profile">Edit profile</EuiLink>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                      {userInfo ? (
                        <EuiLink
                          onClick={(e) => {
                            logoutHandler();
                            closeMenu();
                          }}
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
        label: "Sales team",
        prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
        checked: "on",
        onClick: () => {
          history.push("/admin/userlist");
          closePopover();
        },
      },
      {
        label: "Product Manager",
        prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
        onClick: () => {
          history.push("/admin/productlist");
          closePopover();
        },
      },
      {
        label: "Order Manager",
        prepend: <EuiAvatar type="space" name="Security" size="s" />,
        onClick: () => {
          history.push("/admin/orderlist");
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
      <EuiHeaderSectionItemButton
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Spaces menu"
        onClick={onMenuButtonClick}
      >
        <svg
          class="tw-w-6 tw-h-6 tw-mx-auto"
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
    );

    return (
      <EuiPopover
        id={id}
        ownFocus
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

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      {/* FocusTrap for Docs only */}
      {fullScreen && (
        <EuiFocusTrap>
          <EuiHeader
            className="tw-bg-white tw-mx-auto xl:tw-px-40 lg:tw-h-24 tw-h-16"
            borderBottom="none"
            style={{
              borderBottom: "1px solid white",
              boxShadow: "none!important",
            }}
            theme="light"
            position="fixed"
            sections={[
              {
                items: [
                  <Logo history={history} />,

                  <EuiShowFor fullWidth sizes={["m", "l", "xl"]}>
                    {search}
                  </EuiShowFor>,
                ],
                borders: "none",
              },

              {
                items: [
                  <EuiShowFor sizes={["xs", "s"]}>{search}</EuiShowFor>,
                  <EuiHeaderSectionItemButton
                    aria-haspopup="true"
                    aria-label="Apps menu with 1 new app"
                    notification={cartItems.length}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/cart");
                    }}
                  >
                    <EuiIcon type={basketSharp} size="l" />
                  </EuiHeaderSectionItemButton>,
                  <HeaderSpacesMenu history={history} />,
                  <HeaderUserMenu history={history} />,
                  <HeaderAppMenu history={history} />,
                ],
                borders: "none",
              },
            ]}
          />
        </EuiFocusTrap>
      )}
    </>
  );
};

// import React, { useState } from "react";
// import "@elastic/eui/dist/eui_theme_light.css";
// import { Link } from "react-router-dom";
// import { logout } from "../actions/userActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
//   const history = useHistory();

// import Logo from "./Logo";

// import {
//   basket,
//   basketSharp,
//   cogOutline,
//   cogSharp,
//   personCircleSharp,
//   personCircleOutline,
//   settingsOutline,
//   storefront,
//   storefrontOutline,
//   storefrontSharp,
// } from "ionicons/icons";
// import AdminButton from "../components/AdminButton";

// import { IonItem, IonIcon, IonListHeader } from "@ionic/react";

// import {
//   EuiAvatar,
//   EuiButton,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiHeader,
//   EuiHeaderBreadcrumbs,
//   EuiHeaderLogo,
//   EuiHeaderSection,
//   EuiHeaderSectionItem,
//   EuiHeaderSectionItemButton,
//   EuiIcon,
//   EuiKeyPadMenu,
//   EuiKeyPadMenuItem,
//   EuiLink,
//   EuiPopover,
//   EuiPopoverFooter,
//   EuiPopoverTitle,
//   EuiSelectable,
//   EuiSelectableMessage,
//   EuiSelectableTemplateSitewide,
//   EuiSpacer,
//   EuiText,
// } from "@elastic/eui";
// import { htmlIdGenerator } from "@elastic/eui/lib/services";

// export default () => {
//   const history = useHistory();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const renderLogo = () => (
//     <EuiHeaderSectionItem border="right">
//       <Logo history={history} />
//     </EuiHeaderSectionItem>
//   );

//   const search = (
//     <EuiSelectableTemplateSitewide
//       options={[]}
//       searchProps={{
//         compressed: true,
//       }}
//       popoverButton={
//         <EuiHeaderSectionItemButton aria-label="Sitewide search">
//           <EuiIcon type="search" size="m" />
//         </EuiHeaderSectionItemButton>
//       }
//       emptyMessage={
//         <EuiSelectableMessage style={{ minHeight: 300 }}>
//           <p>
//             Please see the component page for{" "}
//             <Link to="/forms/selectable">
//               <strong>EuiSelectableTemplateSitewide</strong>
//             </Link>{" "}
//             on how to configure your sitewide search.
//           </p>
//         </EuiSelectableMessage>
//       }
//     />
//   );

//   return (
//     <EuiHeader>
//       <EuiHeaderSection grow={false}>
//         <EuiHeaderSectionItem border="right">
//           {renderLogo()}
//         </EuiHeaderSectionItem>
//         <EuiHeaderSectionItem border="right">
//           <HeaderSpacesMenu history={history} />
//         </EuiHeaderSectionItem>
//       </EuiHeaderSection>

//       <EuiHeaderSection side="right">
//         <EuiHeaderSectionItemButton
//           aria-haspopup="true"
//           aria-label="Apps menu with 1 new app"
//           notification={cartItems.length}
//           onClick={(e) => {
//             e.preventDefault();
//             history.push("/cart");
//           }}
//         >
//           <EuiIcon type={basketSharp} size="l" />
//         </EuiHeaderSectionItemButton>

//         <EuiHeaderSectionItem>{search}</EuiHeaderSectionItem>

//         <EuiHeaderSectionItem>
//           <HeaderUserMenu history={history} />
//         </EuiHeaderSectionItem>

//         <EuiHeaderSectionItem>
//           <HeaderAppMenu history={history} />
//         </EuiHeaderSectionItem>
//       </EuiHeaderSection>
//     </EuiHeader>
//   );
// };

// const HeaderAppMenu = ({ history }) => {
//   const idGenerator = htmlIdGenerator();
//   const popoverId = idGenerator("popover");
//   const keypadId = idGenerator("keypad");

//   const [isOpen, setIsOpen] = useState(false);

//   const onMenuButtonClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   const button = (
//     <EuiHeaderSectionItemButton
//       aria-controls={keypadId}
//       aria-expanded={isOpen}
//       aria-haspopup="true"
//       aria-label="Apps menu with 1 new app"
//       onClick={onMenuButtonClick}
//     >
//       <EuiIcon type="apps" size="m" />
//     </EuiHeaderSectionItemButton>
//   );

//   return (
//     <EuiPopover
//       id={popoverId}
//       ownFocus
//       button={button}
//       isOpen={isOpen}
//       anchorPosition="downRight"
//       closePopover={closeMenu}
//     >
//       <EuiKeyPadMenu id={keypadId} style={{ width: 288 }}>
//         <EuiKeyPadMenuItem
//           label="Discover"
//           onClick={(e) => {
//             history.push("/");
//             closeMenu();
//           }}
//         >
//           <EuiIcon type="discoverApp" size="l" />
//         </EuiKeyPadMenuItem>

//         <EuiKeyPadMenuItem
//           label="Orders"
//           onClick={(e) => {
//             history.push("/profile");
//             closeMenu();
//           }}
//         >
//           <EuiIcon type="dashboardApp" size="l" />
//         </EuiKeyPadMenuItem>

//         <EuiKeyPadMenuItem label="Dev Tools">
//           <EuiIcon type="devToolsApp" size="l" />
//         </EuiKeyPadMenuItem>

//         <EuiKeyPadMenuItem
//           label="Cart"
//           onClick={(e) => {
//             history.push("/cart");
//             closeMenu();
//           }}
//         >
//           <EuiIcon type="submodule" size="l" />
//         </EuiKeyPadMenuItem>

//         <EuiKeyPadMenuItem label="Graph">
//           <EuiIcon type="graphApp" size="l" />
//         </EuiKeyPadMenuItem>

//         <EuiKeyPadMenuItem label="Visualize">
//           <EuiIcon type="visualizeApp" size="l" />
//         </EuiKeyPadMenuItem>
//       </EuiKeyPadMenu>
//     </EuiPopover>
//   );
// };
