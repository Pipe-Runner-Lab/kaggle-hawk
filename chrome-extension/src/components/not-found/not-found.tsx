import React from "react";
import NotFoundImage from "../../assets/not-found.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useStyles } from "./styles";

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
