import React from "react";

const Landscape = (props) => {
  let landscapeWidth = props.participants.length <= 4 ? "100%" : "50%";
  let landscapeHeight =
    props.participants.length <= 4
      ? `calc((100vh - 100px)/${props.participants.length}`
      : `calc((100vh - 100px)/${
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
