import React, { useState } from "react";
import { EuiSelect } from "@elastic/eui";

export default function RatingSelect({ rating, setRating }) {
  const options = [
    { value: "1", text: "1 - Poor" },
    { value: "2", text: "2 - Fair" },
    { value: "3", text: "3 - Good" },
    { value: "4", text: "4 - Very Good" },
    { value: "5", text: "5 - Excellent" },
  ];

  // const [value, setValue] = useState(options[5].value);

  return (
    /* DisplayToggles wrapper for Docs only */

    <EuiSelect
      id="selectDocExample"
      options={options}
      value={rating ? rating : "5"}
      onChange={(e) => setRating(e.target.value)}
      aria-label="Use aria labels when no actual label is in use"
    />
  );
}
