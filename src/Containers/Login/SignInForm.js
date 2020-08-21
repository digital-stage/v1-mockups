import React, { useState } from "react";
// import Button from "@material-ui/core/Button";
// import {Input as MaterialInput }from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import { IconButton } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";
import Input from "../../Components/Form/Input";
import ButtonStyled from "../../Components/Form/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

//Firebase
import * as firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(0),
    display: "flex",
    justifyContent: "center",
    padding: "0",
    // flexDirection: "column",
    // alignItems: "center",
  },
  back: {
    // backgroundColor: "#000",
    borderRadius: "5px",
    color: "white",
  },

  form: {
    width: "70%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
    padding: "0 !important",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    borderRadius: "25px",
  },
  buttonGroup: {
    borderRadius: "50px",
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export default function SignInForm(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        props.history.push("/join-stage");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Container maxWidth="sm" className={`${classes.back}, p-0`}>
      {error && <Alert severity="error">{error}</Alert>}
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Input
            required
            id="email"
            placeholder="Username"
            name="email"
            onInputChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            onInputChange={(e) => setPassword(e.target.value)}
          />

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs>
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
            <Grid item className="my-2">
              <ButtonStyled
                type="submit"
                className="button-primary"
                text="Sign in"
              />
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                <h6 style={{ color: "#6E6E6E" }} className="mt-2">
                  Forgot password?
                </h6>
              </Link>
            </Grid>

            <Grid item>
              <h5 style={{ color: "white" }} align="center">
                Or Via
              </h5>

              <Link>
                <IconButton disabled={true}>
                  {" "}
                  <span
                    style={{
                      backgroundColor: "#897FE4",
                      width: "36px",
                      height: "36px",
                      borderRadius: "20px",
                    }}
                  >
                    <Icon
                      className="fab fa-facebook-f"
                      style={{ color: "#fff", fontSize: "20px" }}
                    />
                  </span>
                </IconButton>
              </Link>
              <Link>
                <IconButton>
                  {" "}
                  <span
                    style={{
                      backgroundColor: "#897FE4",
                      width: "36px",
                      height: "36px",
                      borderRadius: "20px",
                    }}
                  >
                    <Icon
                      className="fab fa-google"
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                      }}
                    />
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
                    <Icon
                      className="fab fa-microsoft"
                      style={{ color: "#fff", fontSize: "20px" }}
                    />
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
