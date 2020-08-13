import React from "react";
import { useBreakpoint } from "../../breakpoint.js";
import { stages } from "../../js/stagesMock.js";

const SoundControler = (props) => {
  const breakpoints = useBreakpoint();

  const { color, soundTrackerHeight } = props;
  const SoundControlerStyle = {
    div: {
      height:
        breakpoints.sm && stages.orinetation === "portrait"
          ? "calc(50vh - 54px)"
          : "calc(100vh - 104px)",
      width: "10px",
      position: "absolute",
      zIndex:"150",
      top: "2px",
    },
    span: {
      maxHeight:
        breakpoints.sm && stages.orinetation === "portrait"
          ? "calc(50vh - 54px)"
          : "calc(100vh - 104px)",
      minWidth: "10px",
      display: "inline-block",
      position: "absolute",
      zIndex:"150",
      bottom: "0",
      right: 0,
    },
  };
  return (
    <div style={{ backgroundColor: "grey", ...SoundControlerStyle.div }}>
      <span
        style={{
          backgroundColor: color,
          height:
            breakpoints.sm && stages.orinetation === "portrait"
              ? `calc(${soundTrackerHeight} / 2)`
              : soundTrackerHeight,
          ...SoundControlerStyle.span,
        }}
      ></span>
    </div>
  );
};

export default SoundControler;
