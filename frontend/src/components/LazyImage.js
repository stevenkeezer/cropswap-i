import React, { useState, useEffect } from "react";

const ImageLoad = React.memo(
  ({ src, placeholder, alt = "", height, border, shadow, width, rounded }) => {
    const [loading, setLoading] = useState(true);
    const [currentSrc, updateSrc] = useState(placeholder);

    useEffect(() => {
      // start loading original image
      const imageToLoad = new Image();
      imageToLoad.src = src;
      imageToLoad.onload = () => {
        // When image is loaded replace the src and set loading to false
        setLoading(false);
        updateSrc(src);
      };
    }, [src]);

    return (
      <img
        src={currentSrc}
        className={`tw-object-cover ${rounded && "tw-rounded"}`}
        style={{
          height: height,
          width: width,
          border: border,
          opacity: loading ? 0.5 : 1,
          filter: loading ? "blur(25px)" : "initial",
          transition: "opacity .15s linear",
        }}
        alt={alt}
      />
    );
  }
);

export default ImageLoad;
