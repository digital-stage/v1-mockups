import React, { useState } from "react";
import Group from "./Group";
import { group } from "../../js/stageMock";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profil.png";
import { useBreakpoint } from "../../breakpoint.js";
import { BsArrowClockwise } from "react-icons/bs";
import { makeStyles } from "@material-ui/core";
import SideDrawer from "../../Components/SideDrawer";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const drawerWidth = 60;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerIcon: {
    position: "absolute",
    top: "44px",
    left: "-4px",
    color: "#3D3D3D",
    zIndex: "999999",
  },
  button: {
    backgroundColor: "transparent",
    border: "0px",
    boxShadow: "none",
    color: "#C8C8C8",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "transparent",
      border: "0px",
      boxShadow: "none",
    },
    "&:focus": {
      outline: "0px",
    },
  },
}));

const Stage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(0);
  const [stagesEffect, setStagesEffect] = useState(false);

  function handleChange() {
    if (count === 2) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
    setStagesEffect(true);
    setTimeout(() => {
      setStagesEffect(false);
    }, 1000);
  }

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const breakpoints = useBreakpoint();
  const stagesContainer =
    group.orinetation === "landscape"
      ? { flexWrap: "no-wrap" }
      : { flexWrap: "wrap", minHeight: "calc(100vh - 50px)" };
  return (
    <div className="stages">
      <div
        className={["header", classes.appBar, open && classes.appBarShift].join(
          " "
        )}
      >
        <div className="header-left">
          <img src={logo} alt="logo" />
          <h6>Bohemian Rhapsody</h6>
          <IconButton
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleDrawerOpen}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="header-right">
          <img src={profile} alt="profile-pic" />
        </div>
      </div>
      <div
        className={[
          "stages-container",
          classes.appBar,
          open && classes.appBarShift,
        ].join(" ")}
        style={stagesContainer}
      >
        {open && (
          <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
        )}
        {group.groupParticipants.map((stage, i) => {
          const { name, participants, color, soundTrackerHeight } = stage;
          return (
            <Group
              name={name}
              participants={participants}
              totalStages={group.total}
              color={color}
              soundTrackerHeight={soundTrackerHeight}
              key={name + i}
              breakpoints={breakpoints}
              changeStagePreview={count}
              stagesEffect={stagesEffect}
            />
          );
        })}
      </div>
      <div
        className="change-icon"
        onClick={handleChange}
        title="Change stage preview"
      >
        <BsArrowClockwise color="#d5d5d5" style={{ marginTop: "-5px" }} />
      </div>
    </div>
  );
};

export default Stage;
