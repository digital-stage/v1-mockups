import React from "react";
import { useBreakpoint } from "../../../breakpoint.js";
import { stages } from "../../../js/stagesMock.js";

const Landscape = (props) => {
  const breakpoints = useBreakpoint();
  const height = breakpoints.sm && stages.orinetation === "portrait" ? "50vh" : "100vh";
  const padding = breakpoints.sm && stages.orinetation === "portrait" ? "50px" : "100px";
  let landscapeWidth = props.participants.length <= 4 ? "100%" : "50%";
  let landscapeHeight =
    props.participants.length <= 4
      ? `calc((${height} - ${padding})/${props.participants.length}`
      : `calc((${height} - ${padding})/${
          Math.floor(props.participants.length / 2) +
          (props.participants.length % 2 === 0 ? 0 : 1)
        })`;
  return (
    <img
      src={props.participant.image}
      style={{
        width: landscapeWidth,
        maxWidth: landscapeWidth,
        height: landscapeHeight,
      }}
      key={props.i}
      alt={"landscape" + props.i}
    />
  );
};

export default Landscape;
