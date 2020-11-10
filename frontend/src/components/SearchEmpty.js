import React, { Fragment } from "react";

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui";
import SubFooter from "./SubFooter";

const SearchEmpty = ({ history }) => (
  <>
    <div className="sm:tw-mt-1"></div>
    <EuiEmptyPrompt
      iconType={"/cartEmpty.svg"}
      title={
        <div className="tw-font-medium tw-text-md tw-text-gray-800">
          No search results found.
        </div>
      }
      actions={
        <EuiButton onClick={() => history.push("/")} color="secondary" fill>
          Go back
        </EuiButton>
      }
    />
  </>
);

export default SearchEmpty;
