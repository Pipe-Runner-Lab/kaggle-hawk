import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DataContext from "../../contexts/data-context";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { IconButton, Paper } from "@material-ui/core";
import { Billboard } from "./components/billboard";
import Ticker from "react-ticker";
import NewsTicker from "./components/news-ticker";
import HomeScreenImage from "../../assets/home-screen.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  homeContainer: {
    flex: "1",
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
    display: "flex",
    flexDirection: "column",
  },
  homeContent: {
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
  bottomBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#333",
    justifyContent: "flex-end",
    height: '42px',
    padding: theme.spacing(1),
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
  PrimaryInfoWrapper: {
    display: "flex",
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 2),
    },
  },
  settings: {
    color: "#4dd0e1",
  },
  about: {
    color: "#ffd54f",
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  people: {
    color: "#26c6da",
    margin: theme.spacing(0, 2, 0, 0),
  },
  contest: {
    color: "#ffd54f",
    margin: theme.spacing(0, 2, 0, 0),
  },
  notification: {
    color: "#69f0ae",
    margin: theme.spacing(0, 2, 0, 0),
  },
  watch: {
    color: "#ff80ab",
    margin: theme.spacing(0, 2, 0, 0),
  },
  tickerContainer: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  secondaryInfoContainer: {
    display: "flex",
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 3),
    },
  },
  notificationContainer: {
    flex: 1,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: '170px'
  },
  image: {
    width: "130px",
    height: "auto",
  },
}));

export default function Home() {
  const classes = useStyles();
  const { kaggleMap, kaggleDiffsMap, watchListIds } = useContext(DataContext);

  const numberOfCompetitions = Object.keys(kaggleMap).length;
  const numberOfWatches = watchListIds.length;
  const numberOfPeople = Object.values(kaggleMap).reduce((acc, item, idx) => {
    acc += item.teamCount * item.maxTeamSize;
    return acc;
  }, 0);

  return (
    <div className={classes.root}>
      <div className={classes.homeContainer}>
        <Paper className={classes.homeContent}>
          <div className={classes.PrimaryInfoWrapper}>
            <Billboard
              title={"Active competitions"}
              value={numberOfCompetitions}
              icon={
                <ListAltIcon className={classes.contest} fontSize="small" />
              }
            />
            <Billboard
              title={"Watched competitions"}
              value={numberOfWatches}
              icon={
                <TrendingUpIcon className={classes.watch} fontSize="small" />
              }
            />
          </div>
          <div className={classes.PrimaryInfoWrapper}>
            <Billboard
              title={"Active people"}
              value={numberOfPeople}
              icon={
                <PeopleAltIcon className={classes.people} fontSize="small" />
              }
            />
            <Billboard />
          </div>
          <div className={classes.tickerContainer}>
            <Ticker offset="run-in" speed={10}>
              {() => <NewsTicker />}
            </Ticker>
          </div>
        </Paper>
        <div className={classes.secondaryInfoContainer}>
          <div className={classes.notificationContainer}>
            <Paper className={classes.homeContent}>
              <Billboard
                title={"New notifications"}
                value={0}
                icon={
                  <NotificationsActiveIcon className={classes.notification} fontSize="small" />
                }
              />
            </Paper>
          </div>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={HomeScreenImage}></img>
          </div>
        </div>
      </div>
      <div className={classes.bottomBar}>
        <IconButton className={classes.iconButton}>
          <InfoIcon fontSize="small" className={classes.about} />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <SettingsIcon fontSize="small" className={classes.settings} />
        </IconButton>
      </div>
    </div>
  );
}
