import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import logo from "../../assets/images/welcome_icon.png";
import { useAuth } from "../../js/useAuth";

type Props = {
  history: Array<string> | undefined
}

const Login = (props: Props) => {
  const auth = useAuth();
  const [LoginOpen, setLoginOpen] = useState(true);
  const [SignupOpen, setSignupOpen] = useState(false);

  const showLoginBox = () => {
    setLoginOpen(true);
    setSignupOpen(false);
  };

  const showRegisterBox = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  };
  
  useEffect(() => {
    if (auth.redirectToLogin) {
      setLoginOpen(true);
      setSignupOpen(false);
    }
  }, [auth.redirectToLogin])


  return (
    <Box component="body" className="body">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <img
            src={logo}
            width="120"
            height="auto"
            alt="logo"
            className="mt-3"
          />
        </Grid>
        <Typography
          variant="h2"
          style={{ color: "white" }}
          className="mt-4 mb-5 welcome"
        >
          Welcome
        </Typography>
        <Grid item></Grid>
      </Grid>

      <div className="root-container">
        <div
          style={{
            background: "#000000bf",
            width: "300px",
            borderRadius: "5px",
            boxShadow: "0px 3px 50px rgba(11, 33, 64, 0.75) ",
            padding: "15px 10px",
          }}
        >
          <div className="box-controller mb-3">
            <div
              className={
                "controller " + (LoginOpen ? "selected-controller" : "")
              }
              onClick={() => showLoginBox()}
            >
              <h5>Sign in</h5>
            </div>
            <div
              className={
                "controller " + (SignupOpen ? "selected-controller" : "")
              }
              onClick={() => showRegisterBox()}
            >
              <h5>Sign up</h5>
            </div>
          </div>
          <Box>
            {LoginOpen && <SignInForm history={props.history} />}
            {SignupOpen && <SignUpForm />}
          </Box>
        </div>

        <Box
          mb={0}
          display="flex"
          justifyContent="center"
          color="white"
          className="pt-5"
          style={{ color: "#C2C1C1" }}
        >
          <h6>Enter stage ID to join as Guest</h6>
        </Box>
      </div>
    </Box>
  );
};

export default Login;
