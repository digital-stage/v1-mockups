import React from "react";
import { useBreakpoint } from "../../../breakpoint.js";
import { stages } from "../../../js/stagesMock.js";

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
    <img
      src={props.participant.image}
      style={{
        width: portraitWidth,
        maxWidth: portraitWidth,
        height: portraitHeight,
      }}
      key={props.i}
      alt={"portrait" + props.i}
    />
  );
};

export default Portrait;
