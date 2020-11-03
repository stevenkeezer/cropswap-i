import React, { useState } from "react";

import { EuiComboBox } from "@elastic/eui";

const optionsStatic = [
  {
    label: "Titan",
    "data-test-subj": "titanOption",
  },
  {
    label: "Enceladus is disabled",
    disabled: true,
  },
  {
    label: "Mimas",
  },
  {
    label: "Dione",
  },
  {
    label: "Iapetus",
  },
  {
    label: "Phoebe",
  },
  {
    label: "Rhea",
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: "Tethys",
  },
  {
    label: "Hyperion",
  },
];
export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    /* DisplayToggles wrapper for Docs only */

    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      data-test-subj="demoComboBox"
    />
  );
};
