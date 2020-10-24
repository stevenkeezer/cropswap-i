import {
  EuiFormRow,
  EuiPanel,
  EuiFieldPassword,
  EuiFieldText,
} from "@elastic/eui";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { IonButton } from "@ionic/react";
import React, { useState } from "react";

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
  const [dual, setDual] = useState(true);
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
          <EuiFieldText
            placeholder="Placeholder text"
            value={value}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFormRow>
        <EuiFormRow label="Email" display="rowCompressed">
          <EuiFieldText
            placeholder="Placeholder text"
            value={value}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFormRow>
        <EuiFormRow label="Password" display="rowCompressed">
          <EuiFieldPassword
            placeholder="********"
            // type={dual ? "dual" : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFormRow>
        <EuiFormRow label="Confirm Password" display="rowCompressed">
          <EuiFieldPassword
            placeholder="********"
            type={dual ? "dual" : undefined}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Use aria labels when no actual label is in use"
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
