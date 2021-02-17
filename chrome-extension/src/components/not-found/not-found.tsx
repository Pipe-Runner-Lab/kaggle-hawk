import React from "react";
import NotFoundImage from "../../assets/not-found.png";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "200px",
    height: "auto",
  },
  notFoundText: {
    margin: theme.spacing(2, 0, 0, 0),
    color: theme.palette.action.disabled,
    fontSize: "12px",
    fontWeight: 700,
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={NotFoundImage}></img>
        <div className={classes.notFoundText}>Something went wrong</div>
        <div className={classes.notFoundText}>Please try again later</div>
      </div>
    </div>
  );
}
