import React, { Fragment } from "react";

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui";

const SearchEmpty = ({ history }) => (
  <EuiEmptyPrompt
    iconType={"/cartEmpty.svg"}
    title={<h2>No search results were found.</h2>}
    actions={
      <EuiButton onClick={() => history.push("/")} color="secondary" fill>
        Go back
      </EuiButton>
    }
  />
);

export default SearchEmpty;
