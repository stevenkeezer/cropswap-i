import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiAvatar,
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideOption,
  EuiText,
} from "@elastic/eui";
import LazyImage from "./LazyImage";
import Loader from "../components/Loader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default ({ history, products, loading }) => {
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchRef, setSearchRef] = useState("");
  const [isOpen, setIsOpen] = useState(null);

  const searchValueExists = searchValue && searchValue.length;

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

  const onWindowKeyDown = (e: any) => {
    if (e.metaKey && e.key.toLowerCase() === "k") {
      window.addEventListener("keyup", onWindowKeyUp);
    }
  };

  const onWindowKeyUp = () => {
    searchRef && searchRef.focus();
    setLoading(true);
    window.removeEventListener("keyup", onWindowKeyUp);
  };

  const onKeyUpCapture = (e: any) => {
    if (e.key === "Enter") {
      submitHandler(e);
    }

    setSearchValue(e.currentTarget.value);
    setKeyword(e.currentTarget.value);
  };

  const searchHandler = (e) => {
    // make it lowercase

    console.log(e);
    // e.preventDefault();
    if (e.trim()) {
      history.push(`/search/${e}`);
    } else {
      history.push("/");
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

  return (
    // <form onSubmit={submitHandler}>
    <div className="xl:tw-pt-1 tw-ml-auto tw-antialiased">
      <EuiSelectableTemplateSitewide
        // onClick={() => setIsOpen(!isOpen)}
        isLoading={isLoading}
        onChange={onChange}
        onSubmit={submitHandler}
        options={searchValueExists ? searchData : recentsWithIcon}
        searchProps={{
          placeholder: "Products, brands, farms and more",
          onKeyUpCapture: onKeyUpCapture,
          className:
            "mainSearch tw-bg-gray-200 tw-rounded-md tw-font-sans tw-border-none tw-shadow-none tw-tracking-wide tw-placeholder-gray-500 tw-text-sm",
          inputRef: setSearchRef,
        }}
        listProps={{
          className: "customListClass",
        }}
        popoverProps={{
          className: "customPopoverClass",
          // isOpen: isOpen,
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
              <EuiFlexItem grow={false}>Quickly search using</EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiBadge>Command + K</EuiBadge>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiText>
        }
      />
      <div
        style={{ color: "rgb(74, 74, 74) !important" }}
        className="tw-gap-4 tw-text-sm  tw-mt-1 tw-px-1 tw-items-center lg:tw-flex tw-tracking-wide tw-text-gray-800   tw-leading-tight  tw-text-gray-700 tw-hidden"
      >
        <span
          onClick={(e) => searchHandler("seasonal")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Seasonal
        </span>

        <span
          onClick={(e) => searchHandler("tomatoe")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Tomatoes
        </span>
        <span
          onClick={(e) => searchHandler("vegetable")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Vegetables
        </span>
        <span
          onClick={(e) => searchHandler("fruit")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Fruits
        </span>
        <span
          onClick={(e) => searchHandler("soil")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Soil
        </span>
        <span
          onClick={(e) => searchHandler("squash")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Squash
        </span>
        <span
          onClick={(e) => searchHandler("compost")}
          className="hover:tw-text-teal-700 tw-cursor-pointer"
        >
          Compost
        </span>
        <div
          style={{ paddingTop: ".4rem", paddingBottom: ".4rem" }}
          className="tw-bg-teal-500 tw-font-medium tw-tracking-normal hover:tw-bg-teal-500  tw-flex tw-items-center 
            tw-rounded-full tw-text-teal-100 tw-px-3 tw-shadow-none
            tw-text-sm tw-cursor-pointer"
        >
          <div onClick={(e) => history.push("/cart")} className="">
            Order online
          </div>
        </div>
      </div>
    </div>

    // </form>
  );
};

/**
 * The options object
 */
