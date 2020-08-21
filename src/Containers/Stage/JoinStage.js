import React, { useState } from "react";
import { Box, Grid, Typography, Button, Input } from "@material-ui/core";
import logo from "../../assets/images/white_logo.png";

const JoinStage = (props) => {
  const [stageId, setStageId] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push("/stage");
  };

  return (
    <Box component="body" className="body_color">
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

      <div className="root-container" style={{ height: "calc(100vh - 300px)" }}>
        <div style={{ color: "white", textAlign: "center" }}>
          <h3 style={{ fontWeight: "600 !important" }}>Join stage</h3>
          <form noValidate onSubmit={handleSubmit}>
            <Button
              type="submit"
              medium
              variant="contained"
              style={{
                backgroundColor: "#897FE4",
                color: "white",
                borderRadius: "24px",
                textDecorationL: "none",
              }}
            >
              Join stage
            </Button>
          </form>
        </div>

        <Box
          mb={0}
          display="flex"
          justifyContent="center"
          color="#C2C1C1"
          variant="h3"
          className="pt-4"
          style={{ fontWeight: "600 !important" }}
        >
          Enter stage ID to join as Guest
        </Box>
      </div>
    </Box>
  );
};
export default JoinStage;
