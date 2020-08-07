import React from "react";
import { useBreakpoint } from "../../../breakpoint.js";
import { stages } from "../../../js/stagesMock.js";
import { MdClear } from "react-icons/md";

const Portrait = (props) => {
  const breakpoints = useBreakpoint();
  let portraitWidth;
  let portraitHeight;
  if (stages.orinetation === "portrait" && breakpoints.sm) {
    portraitWidth = `calc(100%/${
      props.participants.length > 2
        ? Math.round(props.participants.length / 2)
        : props.participants.length
    })`;
    portraitHeight = `${
      props.participants.length > 2 ? "calc(25vh - 25px)" : "calc(50vh - 50px)"
    }`;
  } else {
    portraitWidth = `calc(100%/${
      props.participants.length > 2
        ? Math.round(props.participants.length / 2)
        : props.participants.length
    })`;
    portraitHeight = `${
      props.participants.length > 2
        ? "calc(50vh - 50px)"
        : "calc(100vh - 100px)"
    }`;
  }
  return (
    <div
      style={{
        position: "relative",
        width: portraitWidth,
        maxWidth: portraitWidth,
        height: portraitHeight,
      }}
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
      dragover={props.dragover}
    >
     {props.enableHideScreens && props.participants.length > 1 && (
        <div className="hide-screen" onClick={props.hideScreen}>
          <MdClear title="Hide screen" size="1em" />
        </div>
      )}
      <img
        src={props.participant.image}
        style={{
          width: "100%",
          height: "100%",
          opacity:
            props.dragStarted === props.i
              ? "0"
              : props.dragover === props.i
              ? "0.1"
              : "1",
        }}
        key={props.i}
        alt={"portrait" + props.i}
      />
    </div>
  );
};

export default Portrait;
