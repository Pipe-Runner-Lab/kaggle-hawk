import React from "react";
import LoadingImage from "../../assets/loading-image.png";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: "white",
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
  loadingText: {
    margin: theme.spacing(2, 0, 0, 0),
    color: theme.palette.action.disabled,
    fontSize: "12px",
    fontWeight: 700,
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      <div className={classes.imageContainer}>
        <img className={classes.image} src={LoadingImage}></img>
        <div className={classes.loadingText}>Loading...</div>
      </div>
    </div>
  );
}
