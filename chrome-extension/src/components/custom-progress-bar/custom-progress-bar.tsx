import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const CustomProgressBar = withStyles((theme) =>
  createStyles({
    root: {
      height: 2,
    },
    colorPrimary: {
      backgroundColor: "#827717",
    },
    bar: {
      backgroundColor: "#ffee58",
    },
  })
)(LinearProgress);

export default CustomProgressBar;
