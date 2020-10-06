import React from "react";
import { MuiThemeProvider, createMuiTheme, makeStyles, TextField } from "@material-ui/core";

const theme = createMuiTheme({});

theme.overrides = {
  MuiOutlinedInput: {
    root: {
      "&$focused $notchedOutline": {
        borderColor: "#707070",
        borderWidth: 1,
      },
    },
  },
};


type Props = {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  required: boolean,
  type: string,
  id: string,
  name: string,
  InputProps?: object,
  value?: string,
  error?: string
  context?: string,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

const Input = (props: Props) => {
  const useStyles = makeStyles(() => ({
    input: {
      background: `${props.error ? "rgb(240, 212, 209)" : "white"}`,
      borderRadius: "24px",
      color: "black",
      height: "36px",
      width: `${props.context === "search" ? "200px" : props.context === "group" ? "auto" : "199px"}`,
      fontFamily: "Poppins",
      fontSize: "14px",
      // boxShadow: "0px 5px 30px #0B2140",
      marginTop: `${props.context === "search" ? "0px" : "20px"}`,
      fontWeight: 600,
      borderBottom: `${props.error && "1px solid #F20544"}`
    },
    p: {
      color: "white",
      marginLeft: "0 !important",
      fontFamily: "Poppins",
      fontSize: "12px",
      fontWeight: 600,
      paddingLeft: "20px",
      marginTop: "5px",
      marginBottom: "0 !important"
    }
  }));

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        variant="outlined"
        className="without-padding"
        InputProps={{
          className: classes.input,
          ...props.InputProps
        }}
        onChange={props.onInputChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        required={props.required}
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
      />
      {props.error && <p className={classes.p}>{props.error}</p>}
    </MuiThemeProvider>
  );
};



export default Input;
