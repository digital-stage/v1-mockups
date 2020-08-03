import React from "react";

const Portrait = (props) => {
  let portraitWidth = `calc(100%/${
    props.participants.length > 2
      ? Math.round(props.participants.length / 2)
      : props.participants.length
  })`;
  let portraitHeight = `${
    props.participants.length > 2 ? "calc(50vh - 50px)" : "calc(100vh - 100px)"
  }`;
  return (
    <img
      src={props.participant.image}
      style={{
        width: portraitWidth,
        maxWidth: portraitWidth,
        height: portraitHeight,
      }}
      key={props.i}
    />
  );
};

export default Portrait;
