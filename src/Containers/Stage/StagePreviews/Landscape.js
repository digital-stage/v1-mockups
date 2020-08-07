import React from "react";
import { useBreakpoint } from "../../../breakpoint.js";
import { stages } from "../../../js/stagesMock.js";

const Landscape = (props) => {
  const breakpoints = useBreakpoint();
  const height =
    breakpoints.sm && stages.orinetation === "portrait" ? "50vh" : "100vh";
  const padding =
    breakpoints.sm && stages.orinetation === "portrait" ? "50px" : "100px";
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
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
      dragover={props.dragover}
      src={props.participant.image}
      style={{
        width: landscapeWidth,
        maxWidth: landscapeWidth,
        height: landscapeHeight,
        opacity:
          props.dragStarted === props.i
            ? "0"
            : props.dragover === props.i
            ? "0.1"
            : "1",
      }}
      key={props.i}
      alt={"landscape" + props.i}
    />
  );
};

export default Landscape;
