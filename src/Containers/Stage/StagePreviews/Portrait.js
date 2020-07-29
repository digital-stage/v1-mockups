import React from "react";

const Portrait = (props) => {
  let portraitWidth = `calc(100%/${props.participants.length})`;
  let portraitHeight = "calc(100vh - 60px)";
  return (
    <img
      src={props.participant.image}
      style={{
        width: portraitWidth,
        height: portraitHeight,
      }}
      key={props.i}
    />
  );
};

export default Portrait;
