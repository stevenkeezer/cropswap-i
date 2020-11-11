import React, { Fragment } from "react";

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui";
import SubFooter from "./SubFooter";

const SearchEmpty = ({ history }) => (
  <>
    <EuiEmptyPrompt
      iconType={"/cartEmpty.svg"}
      title={
        <div className="tw-font-medium tw-text-xl tw-text-gray-800">
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
