import React from "react";

const Icon = (props:any) => {
  return (
    <>
      <img
        src={require(`../../assets/images/icons/${props.icon}.png`)}
        width="20px"
        height="20px"
        alt={props.icon}
      />
    </>
  );
};

export default Icon;
