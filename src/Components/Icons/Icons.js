import React from "react";

const Icon = (props) => {
  return (
    <>
      <img
        src={require(`../../assets/images/icons/${props.icon}.png`)}
        width="20px"
        height="20px"
      />
    </>
  );
};

export default Icon;
