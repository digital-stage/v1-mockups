import React, { MouseEventHandler, ReactNode } from "react";
import Button from "@material-ui/core/Button";

type Props = {
  onClick?: MouseEventHandler | undefined,
  text: string,
  className:string,
  type?: string,
  startIcon?: ReactNode,
  disabled?:boolean,
  style?:Object
}

const ButtonStyled = (props: Props) => {

  return (
    <Button variant="contained" {...props} type="submit" onClick={props.onClick} startIcon={props.startIcon}>
      {props.text}
    </Button>
  );
};

export default ButtonStyled;
