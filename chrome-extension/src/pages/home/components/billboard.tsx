import React from "react";
import Image from "../../../assets/kaggle.png";
import { numberShortner } from "../../../utils/text";
import clx from "classnames";
import { useStyles } from "./styles";

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
