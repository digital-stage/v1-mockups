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

const Landscape = (props: Props) => {
  const breakpoints: any = useBreakpoint();
  const height =
    breakpoints.sm && group.orinetation === "portrait" ? "50vh" : "100vh";
  const padding =
    breakpoints.sm && group.orinetation === "portrait" ? "50px" : "100px";
  let landscapeWidth = props.participants.length <= 4 ? "100%" : "50%";
  let landscapeHeight =
    props.participants.length <= 4
      ? `calc((${height} - ${padding})/${props.participants.length}`
      : `calc((${height} - ${padding})/${
      Math.floor(props.participants.length / 2) +
      (props.participants.length % 2 === 0 ? 0 : 1)
      })`;
  return (
    <div
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
      style={{
        position: "relative",
        width: landscapeWidth,
        maxWidth: landscapeWidth,
        height: landscapeHeight,
      }}
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
              ? "0"
              : props.dragoverElement === props.i
                ? "0.1"
                : "1",
        }}
        key={props.i}
        alt={"landscape" + props.i}
      />
    </div>
  );
};

export default Landscape;
