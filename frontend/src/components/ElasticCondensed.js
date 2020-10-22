import React, { useState } from "react";

import {
  EuiCheckboxGroup,
  EuiComboBox,
  EuiFieldText,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import {
  IonButtons,
  IonButton,
  IonPage,
  IonContent,
  IonTitle,
} from "@ionic/react";

import ElasticAccordion from "../components/ElasticAccordion";
import { htmlIdGenerator } from "@elastic/eui/lib/services";

const ElasticCondensed = ({
  name,
  email,
  password,
  confirmPassword,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  submitHandler,
}) => {
  const idPrefix = htmlIdGenerator()();

  const [checkboxes] = useState([
    {
      id: `${idPrefix}0`,
      label: "Option one",
    },
    {
      id: `${idPrefix}1`,
      label: "Option two is checked by default",
    },
    {
      id: `${idPrefix}2`,
      label: "Option three",
    },
  ]);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix}1`]: true,
  });

  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);

  const [value, setValue] = useState(20);

  const onRangeChange = (e) => {
    setValue(e.target.value);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onCheckboxChange = (optionId) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };
  return (
    <EuiPanel className="tw-max-w-lg tw-mx-auto">
      <form onSubmit={submitHandler}>
        <EuiFormRow label="Name" display="rowCompressed">
          <input
            name="first"
            isLoading={!name}
            compressed
            class="euiFieldText"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Email" display="rowCompressed">
          <input
            name="first"
            isLoading={!email}
            compressed
            class="euiFieldText"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </EuiFormRow>
        <EuiFormRow label="Password" display="rowCompressed">
          <input
            name="first"
            class="euiFieldText"
            // isLoading={!password}
            onChange={(e) => setPassword(e.target.value)}
            compressed
            value={password}
          />
        </EuiFormRow>
        <EuiFormRow label="Confirm Password" display="rowCompressed">
          <input
            name="first"
            class="euiFieldText"
            onChange={(e) => setConfirmPassword(e.target.value)}
            // isLoading={!confirmPassword}
            compressed
            value={confirmPassword}
          />
        </EuiFormRow>

        <IonButton
          type="submit"
          variant="primary"
          className="tw-mt-4"
          onClick={submitHandler}
        >
          Update
        </IonButton>
        {/* <ElasticAccordion /> */}
        {/* </EuiFormRow> */}
      </form>
    </EuiPanel>
  );
};

export default ElasticCondensed;
