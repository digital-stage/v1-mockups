import React, { MouseEventHandler } from "react";
import Button from "@material-ui/core/Button";

type Props = {
  onClick?: MouseEventHandler | undefined,
  text: string,
  className:string,
  type?: string
}

const ButtonStyled = (props: Props) => {

  return (
    <Button variant="contained" {...props} type="submit" onClick={props.onClick}>
      {props.text}
    </Button>
  );
};

export default ButtonStyled;
