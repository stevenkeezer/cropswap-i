import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideOption,
  EuiText,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchRef, setSearchRef] = useState("");
  const [isOpen, setIsOpen] = useState(null);

  const searchValueExists = searchValue && searchValue.length;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  const searchData: EuiSelectableTemplateSitewideOption[] = [
    {
      label: "Iceberg Lettuce",
      url: "/profile",
      onClick: () => {
        history.push("/product/5f9cffa1ef6e637afe66b681");
        setIsOpen(false);
      },
      avatar: {
        name: "Default Space",
      },
      meta: [
        {
          text: "Iceberg Lettuce",
          type: "application",
          highlightSearchString: true,
        },
      ],
      url: "welcome-dashboards",
    },
    {
      label:
        "[Flights] Flight Count and Average Ticket Price over the course of several years maybe even decades",
      avatar: {
        name: "Default Space",
      },
      meta: [
        {
          text: "Visualization",
          type: "application",
        },
      ],
    },
    {
      label: "[Flights] Global Flight Dashboard",
      avatar: {
        name: "Hello World",
      },
      meta: [
        {
          text: "Dashboard",
          type: "application",
          highlightSearchString: true,
        },
      ],
    },
    {
      label: "[Logs] Host, Visits and Bytes Table",
      meta: [
        {
          text: "TSVB visualization",
          type: "application",
        },
      ],
    },
    {
      label: "[Flights] Flight Log",
      avatar: {
        name: "Hello World",
      },
      meta: [
        {
          text: "Discover",
          type: "application",
        },
      ],
    },
    {
      label: "Dashboards",
      url: "dashboards",
      icon: {
        type: "logoKibana",
      },
    },
    {
      label:
        "Generate HAR Archive of Network Timings/Details for Kibana requests",
      meta: [
        {
          text: "Article",
          type: "article",
        },
        {
          text:
            "https://discuss.elastic.co/t/generate-har-archive-of-network-timings",
          highlightSearchString: true,
        },
      ],
    },
    {
      label: "[Logs] Web Traffic",
      url: "dashboard-logs-web-traffic",
      meta: [
        {
          text: "Dashboard",
          type: "application",
          highlightSearchString: true,
        },
      ],
    },
    {
      label: "Databoard analytics",
      title: "Databoard analytics; Dashboard; Deployment: Flights Data",
      meta: [
        {
          text: "Dashboard",
          type: "application",
        },
        {
          text: "Flights Data",
          type: "deployment",
        },
      ],
    },
    {
      label: "Primary logs",
      avatar: {
        name: "Another",
      },
      meta: [
        {
          text: "Flights Data",
          type: "deployment",
        },
      ],
    },
    {
      label: "SIEM",
      icon: {
        type: "logoSecurity",
      },
      meta: [
        {
          text: "personal-databoard",
          type: "deployment",
        },
      ],
    },
    {
      label: "Dev tools",
      url: "dev-tools-console",
      meta: [
        {
          text: "Management application",
          type: "application",
        },
      ],
    },
    {
      label: "Billing",
      icon: {
        type: "user",
      },
      meta: [
        {
          text: "Account",
          type: "platform",
        },
      ],
    },
    {
      label: "Maps",
      url: "maps",
      icon: { type: "logoKibana" },
      meta: [
        {
          text: "Analyze application",
          type: "application",
        },
      ],
      space: "Hello World",
    },
    {
      label: "Kibana monitoring with MB",
      searchableLabel: "Kibana monitoring with MB; Case no. 00508173",
      meta: [
        {
          text: "Case",
          type: "case",
        },
        {
          text: "00508173",
        },
      ],
    },
    {
      label: "My support tickets",
      icon: {
        type: "help",
      },
      meta: [
        {
          text: "Support",
          type: "platform",
        },
      ],
    },
    {
      label: "Totally custom",
      searchableLabel: "Totally custom with pink metadata",
      icon: {
        type: "alert",
        color: "accent",
      },
      meta: [
        {
          text: "I have a custom type",
          type: "PINK",
        },
      ],
    },
  ];

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
  const recentsWithIcon: EuiSelectableTemplateSitewideOption[] = recents.map(
    (recent) => {
      return {
        ...recent,
        icon: {
          type: "clock",
          color: "subdued",
        },
      };
    }
  );

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
  const onChange = (updatedOptions: EuiSelectableTemplateSitewideOption[]) => {
    const clickedItem = updatedOptions.find(
      (option) => option.checked === "on"
    );
    if (!clickedItem) return;
  };

  return (
    // <form onSubmit={submitHandler}>
    <div className="xl:tw-pt-1 tw-ml-auto tw-antialiased">
      <EuiSelectableTemplateSitewide
        onClick={() => setIsOpen(!isOpen)}
        isLoading={isLoading}
        onChange={onChange}
        onSubmit={submitHandler}
        options={searchValueExists ? searchData : recentsWithIcon}
        searchProps={{
          placeholder: "Products, brands, farms and more",
          onKeyUpCapture: onKeyUpCapture,
          className:
            "mainSearch tw-bg-gray-200 tw-rounded-lg tw-border-none tw-shadow-inner",
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
        className="tw-gap-4 tw-text-xs  tw-mt-2 tw-px-1 tw-items-center lg:tw-flex tw-tracking-wider tw-text-gray-800   tw-leading-tight  tw-text-gray-700 tw-hidden"
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
          size="small"
          className="tw-bg-teal-500 tw-font-medium tw-tracking-wider hover:tw-bg-teal-500
            tw-rounded-full tw-text-white tw-px-3 tw-shadow-none tw-py-1
            tw-text-xs tw-cursor-pointer"
        >
          <span onClick={(e) => history.push("/cart")}>Order online</span>
        </div>
      </div>
    </div>

    // </form>
  );
};

/**
 * The options object
 */
