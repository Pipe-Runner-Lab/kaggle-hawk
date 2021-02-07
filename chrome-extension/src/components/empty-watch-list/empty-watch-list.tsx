import React from "react";
import Image from "../../assets/empty-watch-list.png";
import { makeStyles } from "@material-ui/core/styles";

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
  text: {
    margin: theme.spacing(2, 0, 0, 0),
    color: theme.palette.action.disabled,
    fontSize: "12px",
    fontWeight: 500,
  },
}));

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
