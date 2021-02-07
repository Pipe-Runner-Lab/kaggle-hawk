import React, { useContext, useEffect, useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import {
  KaggleDiffsMapType,
  SanitizedContestMapType,
} from "../../../types/kaggle";
import { NewsType } from "../../../types/news";
import DataContext from "../../../contexts/data-context";

export default function NewsTicker() {
  const { kaggleMap, kaggleDiffsMap, watchListIds } = useContext(DataContext);

  const news = Object.keys(kaggleDiffsMap).map((idx) => {
    const item = kaggleDiffsMap[idx];
    const title = kaggleMap[idx].title;

    // if score change available, then go for teams
    if (item.score.length > 1) {
      const l = parseFloat(item.score[item.score.length - 1].value);
      const r = parseFloat(item.score[item.score.length - 2].value);
      const diff = l - r;
      let type;
      if (diff > 0) {
        type = NewsType.INC;
      } else if (diff < 0) {
        type = NewsType.DEC;
      } else {
        type = NewsType.EQU;
      }
      return {
        type,
        statement: `${title} saw a change of ${diff} score in ${item.updateCycle} hours`,
      };
    }
    if (item.teamCount.length > 1) {
      const l = parseFloat(item.teamCount[item.score.length - 1].value);
      const r = parseFloat(item.teamCount[item.score.length - 2].value);
      const diff = l - r;
      let type;
      if (diff > 0) {
        type = NewsType.INC;
      } else if (diff < 0) {
        type = NewsType.DEC;
      } else {
        type = NewsType.EQU;
      }
      return {
        type,
        statement: `${title} saw a change of ${
          diff * kaggleMap[idx].maxTeamSize
        } people in ${item.updateCycle} hours`,
      };
    }
  });

  return (
    <div style={{ display: "flex", whiteSpace: "nowrap" }}>
      {news.length !== 0 ? (
        news.map((item, idx) => {
          let arrow: JSX.Element;
          if (item.type === NewsType.INC) {
            arrow = (
              <ArrowUpwardIcon style={{ color: "#c6ff00" }} fontSize="small" />
            );
          } else if (item.type === NewsType.DEC) {
            arrow = (
              <ArrowDownwardIcon
                style={{ color: "#ff3d00" }}
                fontSize="small"
              />
            );
          } else {
            arrow = (
              <ImportExportIcon style={{ color: "#ffea00" }} fontSize="small" />
            );
          }

          return (
            <span
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {arrow}
              {item.statement}
            </span>
          );
        })
      ) : (
        <span style={{ visibility: "hidden" }}>Placeholder</span>
      )}
    </div>
  );
}
