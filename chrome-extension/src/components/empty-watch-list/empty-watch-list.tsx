import React from "react";
import Image from "../../assets/empty-watch-list.png";
import {useStyles} from './styles'

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={Image}></img>
        <div className={classes.text}>Watch list empty...</div>
      </div>
    </div>
  );
}
