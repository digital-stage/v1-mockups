import React from "react";
import StagesList from "./StagesList";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import StageDetails from "./StageDetails";
import StageIcon from "../../assets/images/stage-icon.svg"
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useAuth } from "../../hooks/useAuth";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import NotificationsList from "./NotificationsList";
import NotificationsDetails from "./NotificationsDetails";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className?: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    paddingTop: "0 !important",
    "& .MuiPaper-elevation4": {
      boxShadow: "none !important",
    },
    "& .MuiTabs-root": {
      "& button": {
        textTransform: "none !important",
        color: "#fff !important",
        padding: "0 !important",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,
        minHeight: "80px",
        minWidth: "20%",
        margin: "auto",
        "&:focus": {
          outline: '0'
        },
      }
    },
    "& .MuiBox-root": {
      padding: "0px"
    }
  },
  indicator: {
    backgroundColor: "#B71250"
  },
  // ".MuiTab-textColorPrimary.Mui-selected":{
  //   color:"white !important"
  // },
  ".MuiTab-textColorPrimary": {
    color: "#999999 !important"
  },
  // selected: {
  //   color: "red",
  //   ".MuiTab-textColorPrimary.Mui-selected": {
  //     color: "white"
  //   },
  //   "& path": {
  //     color: "white"
  //   }
  // }
}));

const stages = [
  { title: 'Bulshemier Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: StageIcon , username: "username"}] },
  { title: 'National Theatre', mineStage: false, image: StageIcon, online: true, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }] },
  { title: 'Theatre National Royal', mineStage: true, image: StageIcon, online: false, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon , username: "username"}] },
  { title: 'The Old Theatre', mineStage: false, image: StageIcon, online: false, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon , username: "username"}, { userPhoto: StageIcon, username: "username" }] },
  { title: 'Lyceum Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon , username: "username"}, { userPhoto: StageIcon , username: "username"}, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon , username: "username"}, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }, { userPhoto: StageIcon, username: "username" }] },
];

const notifications = [
  { title: "You have been invited to Bulshemier Theatre", time: "2500", image: StageIcon, stageId: 0, type: "invitations" },
  { title: "National Theatre updated it's name", time: "500", image: StageIcon, stageId: 1, type: "updates" },
  { title: "Theatre National Royal updated it's timetable", time: "2000", image: StageIcon, stageId: 2, type: "updates" },
  { title: "You have been invited to The Old Theatre", time: "200", image: StageIcon, stageId: 3, type: "invitations" },
  { title: "Lyceum Theatre update it's name", time: "60", image: StageIcon, stageId: 4, type: "updates" },
  { title: "You have been invited to Bulshemier Theatre", time: "2500", image: StageIcon, stageId: 0, type: "invitations" },
]

enum Selected {
  STAGES = "STAGES",
  SETTINGS = "SETTINGS",
  NOTIFICATIONS = "NOTIFICATIONS"
}

const Home = () => {
  const auth = useAuth();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [stageId, setStageId] = React.useState(0);
  const [notificationId, setNotificationId] = React.useState(0);
  const [selectedStage, setSelectedStage] = React.useState(Selected.STAGES);
  const [showLeftMenu, setShowLeftMenu] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="home">
      <div className="log-out-button" onClick={() => auth.signout()}><AccountCircleIcon style={{ color: "white" }} /></div>
      <div className="toggle-home-tabs" style={showLeftMenu ? { left: "370px" } : { left: "20px" }}>
        <IconButton aria-label="hide" onClick={() => { setShowLeftMenu(!showLeftMenu) }}>
          {showLeftMenu ? <ArrowBackIosSharpIcon style={{ color: "white" }} /> : <ArrowForwardIosSharpIcon style={{ color: "white" }} />}
        </IconButton>
      </div>
      {showLeftMenu && <div className="left-side">
        <div className={classes.root}>
          <AppBar position="static" color="transparent">
            <Tabs classes={{ indicator: classes.indicator }}
              value={value}
              onChange={handleChange}
              scrollButtons="on"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab label="Stages" icon={<VideoLabelIcon />} {...a11yProps(0)} onClick={() => setSelectedStage(Selected.STAGES)} />
              <Tab label="Notifications" icon={<NotificationsNoneIcon />} {...a11yProps(1)} onClick={() => setSelectedStage(Selected.NOTIFICATIONS)} />
              <Tab label="Settings" icon={<SettingsIcon />} {...a11yProps(2)} onClick={() => setSelectedStage(Selected.SETTINGS)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <StagesList onClick={(id) => { setStageId(id) }} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NotificationsList onClick={(id) => { setNotificationId(id) }} notifications={notifications} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Settings
          </TabPanel>
        </div>
      </div>}
      <div className="content" style={showLeftMenu ? { width: "calc(100% -370px)" } : { width: "100%" }}>
        {/* {selectedStage === Selected.HOME && <h4>Home</h4>} */}
        {selectedStage === Selected.STAGES && <StageDetails stage={stages[stageId]} />}
        {selectedStage === Selected.NOTIFICATIONS && <NotificationsDetails stage={stages[notifications[notificationId].stageId]} />}
        {selectedStage === Selected.SETTINGS && <h4>Settings</h4>}
      </div>
    </div>
  );
};

export default Home;
