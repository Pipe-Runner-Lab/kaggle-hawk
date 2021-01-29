import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../app-bar";
import Spacer from "../spacer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    height: "580px",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    color: theme.palette.text.primary,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  iconGroup: {
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  contentContainer: {
    backgroundColor: "#121212",
    flex: 1,
    overflow: "hidden",
  },
}));

type AppShellProps = {
  children: any;
};

export default function AppShell({ children }: AppShellProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <div className={classes.iconGroup}>
          <IconButton className={classes.iconButton}>
            <ArrowBackIcon fontSize="small" className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <HomeIcon fontSize="small" className={classes.icon} />
          </IconButton>
        </div>
        <Spacer />
        <div className={classes.iconGroup}>
          <IconButton className={classes.iconButton}>
            <SearchIcon fontSize="small" className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <InfoIcon fontSize="small" className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <NotificationsIcon fontSize="small" className={classes.icon} />
          </IconButton>
        </div>
      </AppBar>
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
}
