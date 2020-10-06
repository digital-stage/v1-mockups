import React, { MouseEventHandler, ReactNode } from "react";
import { Button } from "@material-ui/core";

type Props = {
  onClick?: MouseEventHandler | undefined,
  text: string,
  className: string,
  type?: string,
  startIcon?: ReactNode,
  disabled?: boolean,
  style?: object
}

const ButtonStyled = (props: Props) => {

  return (
    <Button variant="contained" {...props} type="submit" onClick={props.onClick} startIcon={props.startIcon}>
      {props.text}
    </Button>
  );
};

export default ButtonStyled;
