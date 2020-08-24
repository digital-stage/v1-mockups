import React from "react";
import { useBreakpoint } from "../../../breakpoint.js";
import { group } from "../../../js/stageMock.js";
import { MdClear } from "react-icons/md";


type Props = {
  participants: Array<Object>,
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void,
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void,
  dragoverElement: number | null | undefined,
  enableHideScreens: boolean,
  hideScreen: () => void,
  effectOnSingleImage: number | null,
  participant: any,
  dragStarted: number | null,
  i: number
}

const Portrait = (props: Props) => {
  const breakpoints: any = useBreakpoint();
  let portraitWidth;
  let portraitHeight;
  if (group.orinetation === "portrait" && breakpoints.sm) {
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
    >
      {props.enableHideScreens && props.participants.length > 1 && (
        <div className="hide-screen" onClick={props.hideScreen}>
          <MdClear title="Hide screen" size="1em" />
        </div>
      )}
      <img
        className={
          props.effectOnSingleImage === props.i
            ? "stage-container-animation"
            : ""
        }
        src={props.participant.image}
        style={{
          width: "100%",
          height: "100%",
          opacity:
            props.dragStarted === props.i
              ? "0.1"
              : props.dragoverElement === props.i
                ? "0.2"
                : "1",
        }}
        key={props.i}
        alt={"portrait" + props.i}
      />
    </div>
  );
};

export default Portrait;
