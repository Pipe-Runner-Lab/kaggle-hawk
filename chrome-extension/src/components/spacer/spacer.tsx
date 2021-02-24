import React from "react";
import {useStyles} from './styles'

export default function Spacer() {
  const classes = useStyles();

  return <div className={classes.spacer}></div>;
}
