import { useNProgress } from "@tanem/react-nprogress";
import React from "react";

// import Bar from "./Bar";
// import Container from "./Container";
import Loader from "./Loader";

const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div animationDuration={animationDuration} isFinished={isFinished}>
      {/* <div animationDuration={animationDuration} progress={progress} /> */}
      <Loader />
    </div>
  );
};

export default <Progress isAnimating />;
