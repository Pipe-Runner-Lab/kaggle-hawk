import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../../assets/kaggle.png";

const useStyles = makeStyles((theme) => ({
  billboard: {
    flex: 1,
    border: "1px dashed white",
    borderRadius: "6px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  billboardContent: {
    flex: 1,
    display: "flex",
    fontSize: "34px",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4, 2),
    backgroundColor: "#757575",
  },
  billboardTitle: {
    display: "flex",
    fontSize: "11px",
    padding: theme.spacing(1, 2),
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#616161",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: "60px",
    width: "auto",
  },
}));

type BillboardProps = {
  title?: string;
  value?: string | number;
  icon?: JSX.Element;
};

export function Billboard({ title, value, icon }: BillboardProps) {
  const classes = useStyles();

  return (
    <div className={classes.billboard}>
      {title ? (
        <>
          <div className={classes.billboardContent}>{value}</div>
          <div className={classes.billboardTitle}>
            {icon}
            <span>{title}</span>
          </div>
        </>
      ) : (
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={Image}></img>
        </div>
      )}
    </div>
  );
}
