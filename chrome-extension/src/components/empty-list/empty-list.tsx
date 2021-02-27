import React from "react";
import Image from "../../assets/empty-watch-list.png";
import { useStyles } from "./styles";

type EmptyList = {
  label: string;
};

export default function EmptyList({ label }: EmptyList) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={Image}></img>
        <div className={classes.text}>{label}</div>
      </div>
    </div>
  );
}
