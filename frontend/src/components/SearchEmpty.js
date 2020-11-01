import React, { Fragment } from "react";

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui";
import SubFooter from "./SubFooter";

const SearchEmpty = ({ history }) => (
  <>
    <EuiEmptyPrompt
      iconType={"/cartEmpty.svg"}
      title={<h4>No search results were found.</h4>}
      actions={
        <EuiButton onClick={() => history.push("/")} color="secondary" fill>
          Go back
        </EuiButton>
      }
    />
  </>
);

export default SearchEmpty;
