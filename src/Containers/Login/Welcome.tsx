import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import logo from "../../assets/images/white_logo.png";
import ButtonStyled from "../../Components/Form/Button";
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <Box component="body" className="body">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <img
            src={logo}
            width="80"
            height="auto"
            alt="logo"
            className="mt-3"
          />
        </Grid>
        <Typography
          variant="h5"
          style={{ color: "white" }}
          className="mt-4 welcome"
        >
          Your digital stage for art, music <br /> and theatre ensembles.
        </Typography>
        <Grid item></Grid>
      </Grid>

      <div className="root-container mt-5" style={{ marginTop: "100px !important" }}>
        <div style={{ color: "white", textAlign: "center" }}>
          <h3 className="mb-3">Welcome back</h3>
          <Link to="/login">
            <ButtonStyled
              className="button-primary"
              text="Sign in"
            /></Link>
          <h6 style={{ color: "#C2C1C1" }} className="my-3">
            Sign into account or
            <br /> create a new one
          </h6>
        </div>

        <Box
          mb={0}
          display="flex"
          justifyContent="center"
          color="#C2C1C1"
          className="pt-5"
          style={{ marginTop: "150px" }}
        >
          <h6>Version 0.00001</h6>
        </Box>
      </div>
    </Box>
  );
};
export default Welcome;
