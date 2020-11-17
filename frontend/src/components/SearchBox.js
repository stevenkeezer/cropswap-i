import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiShowFor,
  EuiLink,
  EuiListGroup,
  EuiOutsideClickDetector,
  EuiSelectableTemplateSitewide,
  EuiText,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import { useLocation } from "react-router-dom";

export default ({ history, products, loading }) => {
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchRef, setSearchRef] = useState("");
  const [isOpen, setIsOpen] = useState(null);
  const [selected, setSelected] = useState("");

  const searchValueExists = searchValue && searchValue.length;
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  const searchData = products.map((product) => {
    return {
      label: product.name,
      url: "/profile",
      prepend: <LazyImage height={50} src={product.image} />,
      onClick: () => {
        history.push(`/product/${product._id}`);
        setIsOpen(false);
      },
      meta: [
        {
          text: product.name,
          highlightSearchString: true,
        },
      ],
    };
  });

  /**
   * Timeout to simulate loading (only on key command+k)
   */
  let searchTimeout;
  const startSearchTimeout = () => {
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setLoading(false);
    }, 400);
  };
  clearTimeout(searchTimeout);
  startSearchTimeout();

  /**
   * Take the first 5 options and simulate recently viewed
   */

  const recents = searchData.slice(0, 5);
  const recentsWithIcon = recents.map((recent) => {
    return {
      ...recent,
    };
  });

  /**
   * Hook up the keyboard shortcut for command+k to initiate focus into search input
   */
  useEffect(() => {
    window.addEventListener("keydown", onWindowKeyDown);

    return function cleanup() {
      window.removeEventListener("resize", onWindowKeyDown);
    };
  });

  const onWindowKeyDown = (e) => {
    if (e.metaKey && e.key.toLowerCase() === "k") {
      window.addEventListener("keyup", onWindowKeyUp);
    }
  };

  const onWindowKeyUp = () => {
    searchRef && searchRef.focus();
    setLoading(true);
    window.removeEventListener("keyup", onWindowKeyUp);
  };

  const onKeyUpCapture = (e) => {
    if (e.key === "Enter") {
      submitHandler(e);
    }

    setSearchValue(e.currentTarget.value);
    setKeyword(e.currentTarget.value);
  };

  const searchHandler = (e) => {
    // make it lowercase
    if (e.trim()) {
      history.push(`/search/${e}`);
      setSelected(e);
      setIsOpen(false);
    } else {
      history.push("/");
      setIsOpen(false);
    }
  };

  /**
   * Do something with the selection based on the found option with `checked: on`
   */
  const onChange = (updatedOptions) => {
    const clickedItem = updatedOptions.find(
      (option) => option.checked === "on"
    );
    if (!clickedItem) return;
  };

  const myContent = [
    {
      label: "Seasonal",
      onClick: () => searchHandler("seasonal"),
      isActive: location.pathname === "/search/seasonal",
      size: "s",
    },
    {
      label: "Tomatoes",
      onClick: () => searchHandler("tomatoe"),
      isActive: location.pathname === "/search/tomatoe",
      size: "s",
    },
    {
      label: "Vegetables",
      onClick: () => searchHandler("vegetable"),
      isActive: location.pathname === "/search/vegetable",
      size: "s",
    },
    {
      label: "Peppers",
      onClick: () => searchHandler("peppers"),
      isActive: location.pathname === "/search/peppers",
      size: "s",
    },
    {
      label: "Berries",
      onClick: () => searchHandler("berries"),
      isActive: location.pathname === "/search/berries",
      size: "s",
    },

    {
      label: "Compost",
      onClick: () => searchHandler("compost"),
      isActive: location.pathname === "/search/compost",
      size: "s",
    },
    {
      label: "Deliveries",
      onClick: () => searchHandler("deliveries"),
      isActive: location.pathname === "/search/deliveries",
      size: "s",
    },
    {
      label: (
        <div
          style={{ paddingTop: ".125rem", paddingBottom: ".125rem" }}
          className="tw-bg-teal-600 tw-font-medium tw-tracking-normal hover:tw-bg-teal-500  tw-flex tw-items-center 
            tw-rounded-full tw-text-teal-100 tw-px-3  tw-ml-1 tw-shadow-none
            tw-text-sm tw-cursor-pointer"
        >
          <div onClick={(e) => history.push("/cart")} className="">
            Order online
          </div>
        </div>
      ),
      onClick: () => searchHandler("seasonal"),
      // isActive: location.pathname === "/search/seasonal",
      size: "s",
    },
  ];

  return (
    <div className=" tw-ml-auto tw-antialiased">
      <EuiShowFor sizes={["l", "xl"]}>
        <div style={{ height: 8 }}></div>
      </EuiShowFor>
      <EuiOutsideClickDetector
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        <EuiSelectableTemplateSitewide
          isLoading={isLoading}
          onChange={onChange}
          singleSelection="always"
          onSubmit={submitHandler}
          options={searchValueExists ? searchData : recentsWithIcon}
          searchProps={{
            placeholder: "Products, brands, farms and more",
            onKeyUpCapture: onKeyUpCapture,
            onClick: () => setIsOpen(true),
            className:
              "mainSearch tw-bg-gray-200 tw-rounded-md tw-font-sans tw-border-none tw-shadow-none tw-tracking-wide tw-placeholder-gray-500 tw-text-sm",
            inputRef: setSearchRef,
          }}
          listProps={{
            className: "customListClass",
          }}
          popoverProps={{
            className: "customPopoverClass",
            isOpen: isOpen,
          }}
          popoverButtonBreakpoints={["xs", "s"]}
          popoverFooter={
            <EuiText color="subdued" size="xs">
              <EuiFlexGroup
                alignItems="center"
                gutterSize="s"
                responsive={false}
                wrap
              >
                <EuiFlexItem grow={false}>
                  {searchValueExists && <EuiLink>View more results</EuiLink>}
                </EuiFlexItem>
                <EuiFlexItem />
              </EuiFlexGroup>
            </EuiText>
          }
        />
      </EuiOutsideClickDetector>
      <div style={{ height: 3 }}></div>

      <EuiShowFor sizes={["l", "xl"]}>
        <EuiListGroup
          maxWidth={false}
          listItems={myContent}
          gutterSize="none"
          className="tw-flex tw-text-sm tw-bg-transparent active:tw-bg-transparent"
        ></EuiListGroup>
      </EuiShowFor>

      {/* <div
        style={{ color: "rgb(74, 74, 74) !important" }}
        className=" tw-text-sm  tw-mt-1 tw-px-1 tw-items-center lg:tw-flex tw-tracking-wide tw-text-gray-800   tw-leading-tight  tw-text-gray-700 tw-hidden"
      >
        <span
          onClick={(e) => searchHandler("seasonal")}
          className={`hover:tw-text-teal-500 tw-pr-2 tw-cursor-pointer ${
            selected === "seasonal" && "tw-font-bold tw-text-teal-500"
          }`}
        >
          Seasonal
        </span>

        <span
          onClick={(e) => searchHandler("tomatoe")}
          className={`hover:tw-text-teal-500 tw-px-2 tw-cursor-pointer ${
            selected === "tomatoe" && "tw-font-bold tw-text-teal-500"
          }`}
        >
          Tomatoes
        </span>
        <span
          onClick={(e) => searchHandler("vegetable")}
          className={`hover:tw-text-teal-500 tw-px-2 tw-cursor-pointer ${
            selected === "vegetable" && "tw-font-bold tw-text-teal-500"
          }`}
        >
          Vegetables
        </span>
        <span
          onClick={(e) => searchHandler("fruit")}
          className={`hover:tw-text-teal-500 tw-px-2 tw-cursor-pointer ${
            selected === "fruit" && "tw-font-bold tw-text-teal-500"
          }`}
        >
          Fruits
        </span>
        <span
          onClick={(e) => searchHandler("soil")}
          className={`hover:tw-text-teal-500 tw-px-2 tw-cursor-pointer ${
            selected === "soil" && "tw-font-bold tw-text-teal-500"
          }`}
        >
          Soil
        </span>
        <span
          onClick={(e) => searchHandler("squash")}
          className={`hover:tw-text-teal-500 tw-px-2 tw-cursor-pointer ${
            selected === "squash" && "tw-font-bold tw-text-teal-500"
          }`}
        >
          Squash
        </span>
        <span
          onClick={(e) => searchHandler("compost")}
          className={`hover:tw-text-teal-500 tw-px-2 tw-cursor-pointer ${
            selected === "compost" && "tw-font-bold tw-text-teal-500"
          } `}
        >
          Compost
        </span>
        <div
          style={{ paddingTop: ".35rem", paddingBottom: ".37rem" }}
          className="tw-bg-teal-600 tw-font-medium tw-tracking-normal hover:tw-bg-teal-500  tw-flex tw-items-center 
            tw-rounded-full tw-text-teal-100 tw-px-3 tw-ml-1 tw-shadow-none
            tw-text-sm tw-cursor-pointer"
        >
          <div onClick={(e) => history.push("/cart")} className="">
            Order online
          </div>
        </div>
      </div>
    */}
    </div>
  );
};
