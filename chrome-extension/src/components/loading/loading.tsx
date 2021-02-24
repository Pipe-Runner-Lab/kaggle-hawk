import React from "react";
import LoadingImage from "../../assets/loading-image.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useStyles } from "./styles";

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
