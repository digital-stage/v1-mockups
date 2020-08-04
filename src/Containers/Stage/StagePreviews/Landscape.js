import React from "react";

const Landscape = (props) => {
  let landscapeWidth = "50%";
  let landscapeHeight = `calc((100vh - 100px)/${Math.floor(
    props.participants.length / 2
  ) + (props.participants.length % 2 == 0 ? 0 : 1)})`;
  return (
    <img
      src={props.participant.image}
      style={{
        width: landscapeWidth,
        maxWidth: landscapeWidth,
        height: landscapeHeight,
      }}
      key={props.i}
    />
  );
};

export default Landscape;
