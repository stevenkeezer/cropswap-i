import { IonIcon } from "@ionic/react";
import { star, starHalfOutline, starOutline } from "ionicons/icons";
import PropTypes from "prop-types";
import React from "react";

export default function Rating({ value, text, color }) {
  return (
    <div className="rating tw-flex tw-items-center ">
      <div className="tw-pb-1 tw-mr-1">
        <span>
          <IonIcon
            style={{ color }}
            icon={
              value >= 1 ? star : value >= 0.5 ? starHalfOutline : starOutline
            }
            slot="start"
          />
        </span>
        <span>
          <IonIcon
            style={{ color }}
            icon={
              value >= 2 ? star : value >= 1.5 ? starHalfOutline : starOutline
            }
            slot="start"
          />
        </span>
        <span>
          <IonIcon
            style={{ color }}
            icon={
              value >= 3 ? star : value >= 2.5 ? starHalfOutline : starOutline
            }
            slot="start"
          />
        </span>
        <span>
          <IonIcon
            style={{ color }}
            icon={
              value >= 4 ? star : value >= 3.5 ? starHalfOutline : starOutline
            }
            slot="start"
          />
        </span>
        <span>
          <IonIcon
            style={{ color }}
            icon={
              value >= 5 ? star : value >= 4.5 ? starHalfOutline : starOutline
            }
            slot="start"
          />
        </span>
      </div>
      <div className="tw-mb-1 tw-flex ">
        <span className="tw-text-sm  tw-ml-1 tw-tracking-wide">
          {text && text.split(" ")[1]}
        </span>
        <span className="tw-text-sm tw-opacity-75 tw-text-gray-00 tw-ml-1 tw-tracking-wide">
          {text && text.split(" ")[2]}
        </span>
      </div>
    </div>
  );
}

Rating.defaultProps = {
  color: "#f5ab24",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
