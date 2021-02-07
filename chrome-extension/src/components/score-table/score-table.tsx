import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FullscreenExitTwoTone } from "@material-ui/icons";
import clx from "classnames";
import { LeaderboardMapType, LeaderboardType } from "../../types/kaggle";
import { truncate } from "../../utils/text";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  column1: {
    width: "20px",
  },
  tableHeader: {
    textAlign: "left",
  },
  tableHeaderColor: {
    color: "#a7ffeb",
  },
  tableRow: {},
  cell: {
    padding: theme.spacing(1),
  },
  rankColor: {
    color: "#84ffff",
  },
  table: {
    borderSpacing: "0px",
  },
  teamName: {
    width: "100px",
  },
}));

type ScoreTableProps = {
  data: LeaderboardType[];
  limit: number;
};

export default function ScoreTable({ data, limit }: ScoreTableProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead className={clx(classes.tableHeader, classes.tableHeaderColor)}>
          <tr>
            <th className={classes.cell}>Rank</th>
            <th className={classes.cell}>Team</th>
            <th className={classes.cell}>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.splice(0, limit).map((item: LeaderboardType, idx: number) => (
            <tr key={idx}>
              <td className={clx(classes.cell, classes.rankColor)}>
                {idx + 1}
              </td>
              <td className={clx(classes.cell, classes.teamName)}>
                {truncate(item.teamName, 14)}
              </td>
              <td className={classes.cell}>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
