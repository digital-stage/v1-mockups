import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({});

theme.overrides = {
  MuiOutlinedInput: {
    root: {
      "&$focused $notchedOutline": {
        borderColor: "#897FE4",
        borderWidth: 2,
      },
    },
  },
};

const useStyles = makeStyles(() => ({
  input: {
    background: "white",
    borderRadius: "24px",
    color: "black",
    height: "36px",
    width: "199px",
    fontFamily: "Poppins",
    fontSize: "14px",
    boxShadow: "0px 5px 30px #0B2140",
    marginTop: "20px",
    fontWeight: 600,
  },
}));

const Input = (props) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        className="without-padding"
        InputProps={{
          className: classes.input,
        }}
        onChange={props.onInputChange}
        placeholder={props.placeholder}
        required={props.required}
        {...props}
      />
    </MuiThemeProvider>
  );
};



export default Input;
