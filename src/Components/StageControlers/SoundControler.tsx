import React from "react";
import { useBreakpoint } from "../../breakpoint.js";
import { group } from "../../js/stageMock.js";

type Props = {
  color: string,
  soundTrackerHeight: string
}

const SoundControler = (props: Props) => {
  const breakpoints : any = useBreakpoint();

  const { color, soundTrackerHeight } = props;
  const SoundControlerStyle:{div:{},span:{}} = {
    div: {
      height:
        breakpoints.sm && group.orinetation === "portrait"
          ? "calc(50vh - 54px)"
          : "calc(100vh - 104px)",
      width: "10px",
      position: "absolute",
      zIndex: "150",
      top: "2px",
    },
    span: {
      maxHeight:
        breakpoints.sm && group.orinetation === "portrait"
          ? "calc(50vh - 54px)"
          : "calc(100vh - 104px)",
      minWidth: "10px",
      display: "inline-block",
      position: "absolute",
      zIndex: "150",
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
            breakpoints.sm && group.orinetation === "portrait"
              ? `calc(${soundTrackerHeight} / 2)`
              : soundTrackerHeight,
          ...SoundControlerStyle.span,
        }}
      ></span>
    </div>
  );
};

export default SoundControler;
