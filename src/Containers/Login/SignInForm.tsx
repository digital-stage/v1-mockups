import React, { useState, useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  IconButton,
  Icon,
  makeStyles
} from "@material-ui/core";
import { CheckRounded, CheckBoxOutlineBlank } from "@material-ui/icons";
// @ts-ignore
import { loadCSS } from "fg-loadcss";

import Input from "../../Components/Form/Input";
import ButtonStyled from "../../Components/Form/Button";

import { useAuth } from "../../hooks/useAuth";
import validator from 'validator';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    padding: "0",
  },
  back: {
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

type Props = {
  history?: string[] | undefined,
}

export interface IError {
  email?: string;
  password?: string;
}

export default function SignInForm(props: Props) {

  // Get auth state and re-render anytime it changes
  const auth = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const [errors, setErrors] = useState<IError>({});

  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };

  }, [auth]);

  useEffect(() => {
    if (auth.loginError) {
      setShowAlert(true)
    }
  }, [auth.loginError]);

  useEffect(() => {
    if (auth.loginError) {
      setShowAlert(true)
    }
  }, [auth.loginError]);

  const validate = () => {
    const errorsList: IError = {}
    if (validator.isEmpty(email)) {
      errorsList.email = "Email is required"
    }
    else if (!validator.isEmail(email)) {
      errorsList.email = "Enter a valid email"
    }
    if (validator.isEmpty(password)) {
      errorsList.password = "Password is required"
    }
    setErrors(errorsList)
    return errorsList
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleCheck = () => setChecked(!checked)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      auth.signin(email, password, checked);
    }
  };

  return (
    <Container maxWidth="sm" className={`${classes.back}, p-0`}>
      {showAlert && <div className="alert-box"><p>{auth.loginError}</p></div>}
      <div className={classes.paper}>
        <form className={classes.form} noValidate={true} onSubmit={handleSubmit}>
          <Input
            required={true}
            id="email"
            placeholder="Username"
            name="email"
            type="text"
            error={errors && errors.email}
            onInputChange={handleEmailChange}
          />
          <Input
            required={true}
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            error={errors && errors.password}
            onInputChange={handlePasswordChange}
          />
          <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item={true} xs={true}>
              <FormControlLabel
                className="mb-0 mt-2"
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={handleCheck}
                    checked={checked}
                    checkedIcon={
                      <CheckRounded
                        style={{
                          color: "white",
                          backgroundColor: "#444444",
                          borderRadius: "5px",
                        }}
                      />
                    }
                    icon={<CheckBoxOutlineBlank />}
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
            <Grid item={true} className="my-2">
              <ButtonStyled
                className="button-primary"
                text="Sign in"
                type="submit"
              />
            </Grid>
            <Grid item={true}>
              <Link href="#" variant="body2">
                <h6 style={{ color: "#6E6E6E" }} className="mt-2">
                  Forgot password?
                </h6>
              </Link>
            </Grid>
            <Grid item={true} className="text-center">
              <h5 style={{ color: "white" }}>
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
                    <Icon
                      className="fab fa-facebook-f"
                      style={{ color: "#fff", fontSize: "20px" }}
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
