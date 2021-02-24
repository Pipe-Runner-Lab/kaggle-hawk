import React from "react";
import { useStyles } from "./styles";

type AppBarProps = {
  children?: any;
};

export default function AppBar({ children }: AppBarProps) {
  const classes = useStyles();

  return <div className={classes.appBar}>{children}</div>;
}
