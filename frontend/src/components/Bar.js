import PropTypes from "prop-types";
import React from "react";

const Bar = ({ progress, animationDuration }) => (
  <div
    style={{
      background: "rgb(1, 168, 163)",
      height: 4,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: "fixed",
      top: 0,
      transition: `margin-left ${animationDuration}ms linear ease-in-out`,
      width: "100%",
      zIndex: 1031,
    }}
  >
    <div
      style={{
        // boxShadow: "0 0 10px #319795, 0 0 5px #319795",
        display: "block",
        height: "100%",
        opacity: 1,
        position: "absolute",
        right: 0,
        transform: "rotate(3deg) translate(0px, -4px)",
        width: 100,
      }}
    />
  </div>
);

Bar.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default Bar;
