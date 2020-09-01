import React from "react";
import StagesLink from "./StagesList";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import StageDetails from "./StageDetails";
import StageIcon from "../../assets/images/stage-icon.png"
import UserIcon1 from "../../assets/images/user-img-1.png"
import UserIcon2 from "../../assets/images/user-img-2.png"
import UserIcon3 from "../../assets/images/user-img-3.png"
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton} from "@material-ui/core";

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
    "& .MuiTabs-root": {
      "& button": {
        textTransform: "none !important",
        color: "white !important",
        padding: "0 !important",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,
        minHeight: "80px",
        minWidth: "25%",
        "&:focus": {
          outline: '0'
        }
      }
    },
    "& .MuiBox-root": {
      padding: "8px"
    }
  },
  indicator: {
    backgroundColor: "white",
    color: "white"
  },
  selected: {
    color: "red",
    ".MuiTab-textColorPrimary.Mui-selected": {
      color: "white"
    },
    "& path": {
      color: "white"
    }
  }
}));

const stages = [
  { title: 'Bulshemier Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: UserIcon1 }] },
  { title: 'National Theatre', mineStage: false, image: StageIcon, online: true, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }] },
  { title: 'Theatre National Royal', mineStage: true, image: StageIcon, online: false, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }, { userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }] },
  { title: 'The Old Theatre', mineStage: false, image: StageIcon, online: false, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }] },
  { title: 'Lyceum Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }, { userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }, { userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }] },
  // { title: 'Fortune Theatre', mineStage: false, image: StageIcon, online: false },
  // { title: 'Royal Opera House', mineStage: true, image: StageIcon, online: true },
  // { title: "Dominion Theatre", mineStage: false, image: StageIcon, online: true },
  // { title: 'The London Palladium', mineStage: true, image: StageIcon, online: false }
];

enum Selected {
  HOME = "HOME",
  STAGES = "STAGES",
  SETTINGS = "SETTINGS",
  ACTIVITIES = "ACTIVITIES"
}

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [stageId, setStageId] = React.useState(0);
  const [selectedStage, setSelectedStage] = React.useState(Selected.HOME);
  const [showLeftMenu, setShowLeftMenu] = React.useState(false);
  const [showToggleButton, setShowToggleButton] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    console.log(value, selectedStage)
  };

  return (
    <div className="home">
      {showToggleButton && <div className="toggle-home-tabs hide-toggle-button">
        <IconButton aria-label="hide" onClick={() => { setShowLeftMenu(true); setShowToggleButton(false) }}>
          <MenuIcon />
        </IconButton>
      </div>}
      <div className={["left-side", !showLeftMenu && "show"].join(" ")}>
        <div className={classes.root}>
          <AppBar position="static" color="transparent">
            <Tabs classes={{ indicator: classes.indicator }}
              value={value}
              onChange={handleChange}
              scrollButtons="on"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab label="Home" classes={{ selected: classes.selected }} icon={<HomeOutlinedIcon />} {...a11yProps(0)} onClick={() => setSelectedStage(Selected.HOME)} />
              <Tab label="Stages" icon={<VideoLabelIcon />} {...a11yProps(1)} onClick={() => setSelectedStage(Selected.STAGES)} />
              <Tab label="Settings" icon={<SettingsIcon />} {...a11yProps(2)} onClick={() => setSelectedStage(Selected.SETTINGS)} />
              <Tab label="Activities" icon={<NotificationsNoneIcon />} {...a11yProps(3)} onClick={() => setSelectedStage(Selected.ACTIVITIES)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Home
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StagesLink onClick={(id) => { setStageId(id); setShowLeftMenu(false); setShowToggleButton(true) }} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Settings
          </TabPanel>
          <TabPanel value={value} index={3}>
            Activities
          </TabPanel>
        </div>
      </div>
      <div className="content">
        {selectedStage === Selected.HOME && <h4>Home</h4>}
        {selectedStage === Selected.STAGES && <StageDetails stage={stages[stageId]} />}
        {selectedStage === Selected.SETTINGS && <h4>Settings</h4>}
        {selectedStage === Selected.ACTIVITIES && <h4>Activities</h4>}
      </div>
    </div>
  );
};

export default Home;
