import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import StagesList from './StagesList'
import Icons from '../../Components/Icons/Icons';
import StageDetails from './StageDetails';
import NotificationsDetails from './NotificationsDetails';
import StageIcon from "../../assets/images/stage-icon.svg"
import NotificationsList from './NotificationsList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 380;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& .MuiListItem-gutters': {
        padding: "16px !important"
      },
      '& .MuiListItemIcon-root': {
        minWidth: "56px !important"
      },
      '& .makeStyles-drawerClose-8': {
        width: '56px !important'
      },
      '& .MuiDrawer-paper': {
        overflow: "hidden !important"
      },
      '& .makeStyles-content-10':{
        padding: "0px !important"
      }
    },

    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 0,
      justifyContent: "center",
      color: "#979797",
      "&:focus": {
        outline: "0px",
      },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'normal',
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: "#272727",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      backgroundColor: "#272727",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const stages = [
  { title: 'Bulshemier Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: StageIcon, username: "username" }] },
  { title: 'National Theatre', mineStage: false, image: StageIcon, online: true, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }] },
  { title: 'Theatre National Royal', mineStage: true, image: StageIcon, online: false, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }] },
  { title: 'The Old Theatre', mineStage: false, image: StageIcon, online: false, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }] },
  { title: 'Lyceum Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }] },
];

const notifications = [
  { title: "You have been invited to Bulshemier Theatre", time: "2500", image: StageIcon, stageId: 0, type: "invitations" },
  { title: "National Theatre updated it's name", time: "500", image: StageIcon, stageId: 1, type: "updates" },
  { title: "Theatre National Royal updated it's timetable", time: "2000", image: StageIcon, stageId: 2, type: "updates" },
  { title: "You have been invited to The Old Theatre", time: "200", image: StageIcon, stageId: 3, type: "invitations" },
  { title: "Lyceum Theatre update it's name", time: "60", image: StageIcon, stageId: 4, type: "updates" },
  { title: "You have been invited to Bulshemier Theatre", time: "2500", image: StageIcon, stageId: 0, type: "invitations" },
]

enum SelectedItem {
  MENU = "MENU",
  STAGE = "STAGE",
  SETTINGS = "SETTINGS",
  NOTIFICATION = "NOTIFICATION"
}

export default function Home() {
  const classes = useStyles();
  const auth = useAuth();
  const [open, setOpen] = React.useState(true);
  const [stageId, setStageId] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<string>(SelectedItem.STAGE);
  const [notificationId, setNotificationId] = React.useState(0);


  const handleDrawer = (icon: string) => {
    if (icon === "menu") {
      setOpen(!open);
    }
  };

  const setDrawerSelection = (selection: string) => {
    console.log(selection)
    if (selection === SelectedItem.MENU) {
      setSelectedItem(selectedItem);
    }
    else {
      setSelectedItem(selection);
    }
  };

  const setDrawerIconColor = (selected: string) => {
    let color = "#999";
    if (selected === SelectedItem.MENU) {
      color = "#fff"
    }
    if (selected === selectedItem) {
      color = "#fff"
    }
    return color
  }

  return (
    <div className={clsx(classes.root, "home")}>
      <div className="log-out-button" onClick={() => auth.signout()}><AccountCircleIcon style={{ color: "white" }} /></div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div style={{ display: 'flex', flexDirection: "row" }} className="left-side">
          <div className="side-drawer">
            <List>
              {['menu', 'stage', 'notification'].map((text) => (
                <ListItem button key={text} onClick={() => { handleDrawer(text); setDrawerSelection(text.toUpperCase()) }}>
                  <Icons icon={text} color="none" fillColor={setDrawerIconColor(text.toUpperCase())} width={30} height={25} />
                </ListItem>
              ))}
            </List>
            <List>
              {['feedback', 'settings'].map((text) => (
                <ListItem button key={text}>
                  <Icons icon={text} color="none" fillColor={setDrawerIconColor(text.toUpperCase())} width={30} height={25} />
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            {
              selectedItem === SelectedItem.STAGE &&
              <><StagesList onClick={(id) => { setStageId(id) }} /></>
            }
            {
              selectedItem === SelectedItem.NOTIFICATION &&
              <NotificationsList onClick={(id) => { setNotificationId(id) }} notifications={notifications} />
            }
          </div>
        </div>

      </Drawer>


      <main className={clsx(classes.content, "content")}>
        {selectedItem === SelectedItem.STAGE && <StageDetails stage={stages[stageId]} />}
        {selectedItem === SelectedItem.NOTIFICATION && <NotificationsDetails stage={stages[notifications[notificationId].stageId]} />}
        {selectedItem === SelectedItem.SETTINGS && <h4>Settings</h4>}
      </main>
    </div>
  );
}
