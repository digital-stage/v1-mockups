import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: "auto",
    background: "#333333",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  listIcon: {
    justifyContent: "center",
    color: "#979797",
    minWidth: "auto",
    "&:focus": {
      outline: "0px",
    },
  },
}));

type Props = {
  handleDrawerClose: () => void,
  open: boolean
}

export default function SideDrawer(props:Props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={props.handleDrawerClose}
            className={classes.listIcon}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="video">
            <ListItemIcon className={classes.listIcon}>
              <VideocamOutlinedIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="audio">
            <ListItemIcon className={classes.listIcon}>
              <VolumeUpOutlinedIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="audio">
            <ListItemIcon className={classes.listIcon}>
              <DevicesOtherIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
