import React, { Fragment } from "react";

import {
  EuiIcon,
  EuiTabbedContent,
  EuiTitle,
  EuiText,
  EuiSpacer,
} from "@elastic/eui";

export default () => {
  const tabs = [
    {
      id: "id",
      name: "Reviews",
    },
  ];

  return (
    <div className="tw-max-w-screen-xl tw-px-4   tw-mx-auto">
      <EuiTabbedContent
        tabs={tabs}
        initialSelectedTab={tabs[1]}
        autoFocus="selected"
        onTabClick={(tab) => {
          console.log("clicked tab", tab);
        }}
      />
    </div>
  );
};
