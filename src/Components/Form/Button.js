import React from "react";
import Button from "@material-ui/core/Button";

const ButtonStyled = (props) => {

  return (
    <Button variant="contained" {...props}>
      {props.text}
    </Button>
  );
};

export default ButtonStyled;
