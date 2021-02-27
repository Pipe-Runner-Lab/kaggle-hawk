import React, { useContext } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DataContext from "../../contexts/data-context";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { IconButton, Paper } from "@material-ui/core";
import { Billboard } from "./components/billboard";
import Ticker from "react-ticker";
import NewsTicker from "./components/news-ticker";
import HomeScreenImage from "../../assets/home-screen.png";
import NotFound from "../../components/not-found";
import Loading from "../../components/loading";
import { useStyles } from "./styles";

export default function Home() {
  const classes = useStyles();
  const {
    kaggleMap,
    watchListIds,
    error,
    kaggleDataLoading,
  } = useContext(DataContext);

  const numberOfCompetitions = Object.keys(kaggleMap).length;
  const numberOfWatches = watchListIds.length;
  const numberOfPeople = Object.values(kaggleMap).reduce((acc, item) => {
    acc += item.teamCount * item.maxTeamSize;
    return acc;
  }, 0);

  if (error) {
    return <NotFound />;
  }

  if (kaggleDataLoading) {
    return <Loading />;
  }

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
              color="#ffecb3"
            />
            <Billboard
              title={"Watched competitions"}
              value={numberOfWatches}
              icon={
                <TrendingUpIcon className={classes.watch} fontSize="small" />
              }
              color="#ffcdd2"
            />
          </div>
          <div className={classes.PrimaryInfoWrapper}>
            <Billboard
              title={"Active people"}
              value={numberOfPeople}
              icon={
                <PeopleAltIcon className={classes.people} fontSize="small" />
              }
              color="#b2ebf2"
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
                  <NotificationsActiveIcon
                    className={classes.notification}
                    fontSize="small"
                  />
                }
                color="#c8e6c9"
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
