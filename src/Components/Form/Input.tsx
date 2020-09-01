import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({});

theme.overrides = {
  MuiOutlinedInput: {
    root: {
      "&$focused $notchedOutline": {
        borderColor: "#707070",
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
    // boxShadow: "0px 5px 30px #0B2140",
    marginTop: "20px",
    fontWeight: 600,
  },

}));


type Props = {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  required: boolean,
  type: string,
  id: string,
  name: string,
  InputProps?: Object,
  value?: string
}

const Input = (props: Props) => {
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
        placeholder={props.placeholder}
        required={props.required}
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
      // {...props}
      />
    </MuiThemeProvider>
  );
};



export default Input;
