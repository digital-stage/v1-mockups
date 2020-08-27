import React from "react";
import Search from "./Search";
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

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="home">
      <div className="left-side">
        <div className={classes.root}>
          <AppBar position="static" color="transparent">
            <Tabs classes={{ indicator: classes.indicator }}
              value={value}
              onChange={handleChange}
              // variant="scrollable"
              scrollButtons="on"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab label="Home" classes={{ selected: classes.selected }} icon={<HomeOutlinedIcon />} {...a11yProps(0)} />
              <Tab label="Stages" icon={<VideoLabelIcon />} {...a11yProps(1)} />
              <Tab label="Settings" icon={<SettingsIcon />} {...a11yProps(2)} />
              <Tab label="Activities" icon={<NotificationsNoneIcon />} {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Home
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Search />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Settings
          </TabPanel>
              <TabPanel value={value} index={3}>
                Activities
          </TabPanel>
        </div>
        {/* <Search /> */}
      </div>
      <div className="content">
        <h3>Feed</h3>
      </div>
    </div>
  );
};

export default Home;
