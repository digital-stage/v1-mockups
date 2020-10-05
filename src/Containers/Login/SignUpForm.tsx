import React, { useState, useEffect } from "react";
import {
  Link,
  Grid,
  Container,
  IconButton,
  Icon,
  makeStyles
} from "@material-ui/core";
// @ts-ignore
import { loadCSS } from "fg-loadcss";

import Input from "../../Components/Form/Input";
import ButtonStyled from "../../Components/Form/Button";

import { useAuth } from "../../hooks/useAuth";
import validator from 'validator';

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

export interface IError {
  email?: string;
  username?: string;
  password?: string;
  repeatPassword?: string;
}

export default function SignUpForm() {
  const auth = useAuth();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<IError>({});
  const [showAlert, setShowAlert] = useState(false);

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  useEffect(() => {
    if (auth.signupError)
      setShowAlert(true)
  }, [auth.signupError]);

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
    else if (!validator.matches(password, '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\\$%\\^&\\*]).{8,}$')) {
      errorsList.password = "Password must contain numbers, special chars, uppercase and lowercase letters and at least 8 chars"
    }
    if (validator.isEmpty(repeatPassword)) {
      errorsList.repeatPassword = "Repeat password"
    }
    if (validator.isEmpty(username)) {
      errorsList.username = "Username is required"
    }
    if (!validator.equals(password, repeatPassword)) {
      errorsList.repeatPassword = "Passwords must be equal"
      errorsList.password = "Passwords must be equal"
    }
    setErrors(errorsList)
    return errorsList
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleReapeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      auth.signup(email, password, username);
    }
  };

  return (
    <Container maxWidth="sm" className={`${classes.back}, p-0 mt-0`}>
      <div className={classes.paper}>
        {showAlert && <div className="alert-box"><p>{auth.signupError}</p></div>}
        <form className={classes.form} noValidate={true} onSubmit={handleSubmit}>
          <Input
            required={true}
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            error={errors && errors.email}
            onInputChange={handleEmailChange}
          />
          <Input
            required={true}
            id="Username"
            placeholder="Username"
            name="Username"
            type="text"
            error={errors && errors.username}
            onInputChange={handleUsernameChange}
          />
          <Input
            required={true}
            id="passwrod"
            placeholder="Password"
            name="password"
            type="password"
            error={errors && errors.password}
            onInputChange={handlePasswordChange}
          />
          <Input
            required={true}
            id="Repeat password"
            placeholder="Repeat password"
            type="password"
            name="password"
            error={errors && errors.repeatPassword}
            onInputChange={handleReapeatPasswordChange}
          />
          <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
            className="mt-4"
          >
            {/* <Grid item xs className="my-2">
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
            </Grid> */}
            <Grid item={true}>
              <ButtonStyled
                className="button-primary"
                text="Sign up"
              />
            </Grid>
            <Grid item={true} className="mt-3">
              <h5 style={{ color: "white", textAlign: "center" }}>
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
