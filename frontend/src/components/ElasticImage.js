import React from "react";

import { EuiImage } from "@elastic/eui";

const ElasticImage = ({ image, name }) => (
  <EuiImage
    size="original"
    // hasShadow
    allowFullScreen
    fullScreenIconColor="dark"
    alt={name}
    url={image}
  />
);
export default ElasticImage;
