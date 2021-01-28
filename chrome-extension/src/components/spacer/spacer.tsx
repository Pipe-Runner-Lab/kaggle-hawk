import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  spacer: {
    flex: 1,
  },
}));

export default function Spacer() {
  const classes = useStyles();

  return <div className={classes.spacer}></div>;
}
