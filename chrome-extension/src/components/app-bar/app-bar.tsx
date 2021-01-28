import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "42px",
    backgroundColor: "#333",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(0, 2),
  },
}));

type AppBarProps = {
  children?: any;
};

export default function AppBar({ children }: AppBarProps) {
  const classes = useStyles();

  return <div className={classes.appBar}>{children}</div>;
}
