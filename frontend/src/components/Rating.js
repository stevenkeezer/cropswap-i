import React from "react";
import { IonIcon } from "@ionic/react";
import { star, starHalfOutline, starOutline } from "ionicons/icons";
import PropTypes from "prop-types";
import { EuiShowFor } from "@elastic/eui";
export default function Rating({ value, text, color }) {
  // const star = (
  //   <svg
  //     class="tw-w-6 tw-h-6"
  //     fill="currentColor"
  //     viewBox="0 0 20 20"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  //   </svg>
  // );

  return (
    <div className="rating tw-flex tw-items-center ">
      <div className=" tw-mr-1">
        <EuiShowFor sizes={["xs", "sm"]}>
          <svg
            class="tw-w-4 tw-h-4 tw-text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </EuiShowFor>

        <EuiShowFor sizes={["m", "l", "xl"]}>
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
        </EuiShowFor>
      </div>
      <div className="tw-flex   tw-items-baseline tw-text-sm">
        {value}
        <span className="tw-text-sm tw-text-gray-800 tw-pl-2">
          ({text && text})
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
