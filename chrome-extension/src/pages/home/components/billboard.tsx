import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../../assets/kaggle.png";
import { numberShortner } from "../../../utils/text";
import clx from "classnames";

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
    backgroundColor: "#2e2e2e",
  },
  billboardTitle: {
    display: "flex",
    fontSize: "11px",
    padding: theme.spacing(1, 2),
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#404040",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#2e2e2e",
  },
  image: {
    height: "60px",
    width: "auto",
  },
  inActive: {
    filter: "grayscale(100%)",
  },
}));

type BillboardProps = {
  title?: string;
  value?: string | number;
  icon?: JSX.Element;
  color?: string;
};

export function Billboard({ title, value, icon, color }: BillboardProps) {
  const classes = useStyles();

  return (
    <div
      className={clx(classes.billboard, { [classes.inActive]: value === 0 })}
    >
      {title ? (
        <>
          <div className={classes.billboardContent} style={{ color }}>
            {numberShortner(value)}
          </div>
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
