import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import logo from "../../assets/images/white_logo.png";
import ButtonStyled from "../../Components/Form/Button";

type Props = {
  history: string[],
}

const JoinStage = (props:Props) => {
  // const [stageId, setStageId] = useState(null);
  // const [password, setPassword] = useState(null);

  const handleSubmit = (e:{preventDefault: ()=>void}) => {
    e.preventDefault();
    props.history.push("/stage");
  };

  return (
    <Box component="body" className="body">
      <Grid container={true} direction="column" justify="center" alignItems="center">
        <Grid item={true}>
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
        <Grid item/>
      </Grid>

      <div className="root-container">
        <div>
          <h3
            className="mt-5"
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Join stage
          </h3>
          {/* onSubmit={handleSubmit} */}
          <form noValidate={true} >
            <ButtonStyled
              // type="submit"
              onClick={handleSubmit}
              text="Join stage"
              className="button-primary"
            />
          </form>
        </div>

        <Box
          mb={0}
          display="flex"
          justifyContent="center"
          color="#C2C1C1"
          className="pt-3"
        >
          <h6>Enter stage ID to join as Guest</h6>
        </Box>
      </div>
    </Box>
  );
};
export default JoinStage;
