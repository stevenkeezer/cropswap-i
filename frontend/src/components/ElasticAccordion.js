import {
  EuiAccordion,
  EuiButtonIcon,
  EuiFieldPassword,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import React from "react";

const repeatableForm = (
  <EuiForm>
    <EuiFlexItem>
      <EuiFormRow label="Password">
        <EuiFieldPassword icon="lock" />
      </EuiFormRow>
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiFormRow
        label="Confirm Password"
        helpText="Must include one number and one symbol"
      >
        <EuiFieldPassword icon="lock" />
      </EuiFormRow>
    </EuiFlexItem>
  </EuiForm>
);

const buttonContent = (
  <div>
    <EuiFlexGroup
      gutterSize="s"
      alignItems="center"
      responsive={false}
    ></EuiFlexGroup>

    <EuiText size="s"></EuiText>
  </div>
);

const extraAction = (
  <EuiButtonIcon
    iconType="cross"
    color="danger"
    className="euiAccordionForm__extraAction"
    aria-label="Delete"
  />
);

export default () => (
  <div>
    <EuiSpacer size="l" />
    <EuiFormRow label="Password" display="rowCompressed">
      <EuiAccordion
        compressed
        id="accordionForm1"
        className="euiAccordionForm"
        buttonClassName="euiAccordionForm__button"
        buttonContent={buttonContent}
        extraAction={extraAction}
        paddingSize="l"
      >
        {repeatableForm}
      </EuiAccordion>
    </EuiFormRow>
  </div>
);
