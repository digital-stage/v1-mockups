import React from "react";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { IconButton } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";
import Input from "../../Components/Form/Input";
import ButtonStyled from "../../Components/Form/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  back: {
    color: "white",
  },

  form: {
    width: "70%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input1: {
    background: "white",
    borderRadius: "25px",
    color: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "25px",
  },
  buttonGroup: {
    borderRadius: "50px",
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export default function SignUpForm() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Container maxWidth="sm" className={`${classes.back}, p-0 mt-0`}>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Input required id="email" placeholder="Email" name="email" />

          <Input
            required
            id="Username"
            placeholder="Username"
            name="Username"
          />
          <Input
            margin="normal"
            required
            id="passwrod"
            placeholder="Password"
            name="password"
          />
          <Input
            required
            id="Repeat password"
            placeholder="Repeat password"
            name="password"
          />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs className="my-2">
              <FormControlLabel
                className="mb-0 mt-2"
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checkedIcon={
                      <CheckRoundedIcon
                        style={{
                          color: "white",
                          backgroundColor: "#444444",
                          borderRadius: "5px",
                        }}
                      />
                    }
                    icon={<CheckBoxOutlineBlankIcon />}
                    style={{
                      color: "#444444",
                      borderRadius: "24px",
                    }}
                  />
                }
                label={
                  <Typography variant="h6" style={{ color: "#929292" }}>
                    Stay signed in
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <ButtonStyled
                type="submit"
                className="button-primary"
                text="Sign up"
              />
            </Grid>

            <Grid item className="mt-3">
            <h5 style={{ color: "white" }} align="center">
                Or Via
              </h5>

              <Link>
                <IconButton disabled={true}>
                  <span
                    style={{
                      backgroundColor: "#897FE4",
                      width: "36px",
                      height: "36px",
                      borderRadius: "20px",
                    }}
                  >
                    <Icon className="fab fa-facebook-f" style={{ color: "#fff", fontSize: "20px" }} />
                  </span>
                </IconButton>
              </Link>
              <Link>
                <IconButton>
                  <span
                    style={{
                      backgroundColor: "#897FE4",
                      width: "36px",
                      height: "36px",
                      borderRadius: "20px",
                    }}
                  >
                    <Icon className="fab fa-google" style={{ color: "#fff", fontSize: "20px" }} />
                  </span>
                </IconButton>
              </Link>
              <Link>
                <IconButton>
                  <span
                    style={{
                      backgroundColor: "#897FE4",
                      width: "36px",
                      height: "36px",
                      borderRadius: "20px",
                    }}
                  >
                    <Icon className="fab fa-microsoft" style={{ color: "#fff", fontSize: "20px" }}/>
                  </span>
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
