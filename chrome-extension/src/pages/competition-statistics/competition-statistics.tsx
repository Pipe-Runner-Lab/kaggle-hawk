import React, { useContext } from "react";
import ScoreIcon from "@material-ui/icons/Score";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useParams } from "react-router-dom";
import DataContext from "../../contexts/data-context";
import { Paper } from "@material-ui/core";
import NotFound from "../../components/not-found";
import Loading from "../../components/loading";
import { useStyles } from "./styles";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory";
import Scrollbars from "react-custom-scrollbars";

type ParamsType = {
  competitionId: string | undefined;
};

export default function Home() {
  const classes = useStyles();
  const { kaggleMap, kaggleDiffsMap, error, kaggleDataLoading } = useContext(
    DataContext
  );

  const { competitionId } = useParams<ParamsType>();

  const kaggleContest = kaggleMap[competitionId];
  const kaggleDiff = kaggleDiffsMap[competitionId];

  const teamCountData = kaggleDiff.teamCount.map((item) => {
    return {
      x: +item.timestamp,
      y: +item.value,
    };
  });
  const scoreData = kaggleDiff.score.map((item) => {
    return {
      x: +item.timestamp,
      y: +item.value,
    };
  });

  if (error) {
    return <NotFound />;
  }

  if (kaggleDataLoading) {
    return <Loading />;
  }

  return (
    <Scrollbars autoHide>
      <div className={classes.root}>
        <div className={classes.container}>
          <Paper>
            <div>
              <div className={classes.titleContainer}>
                <GroupAddIcon
                  className={classes.participation}
                  fontSize="small"
                />
                Participation
              </div>
              <div className={classes.chartWrapper}>
                <VictoryChart animate={{ duration: 500 }}>
                  <VictoryAxis
                    label="Timeline"
                    style={{
                      axis: { stroke: "white" },
                      axisLabel: { fontSize: 14, padding: 16, fill: "white" },
                      ticks: { stroke: "white" },
                      tickLabels: { fontSize: 15, padding: 5, fill: "white" },
                    }}
                    tickFormat={(t) => ``}
                  />
                  <VictoryAxis
                    dependentAxis
                    label="Teams"
                    style={{
                      axis: { stroke: "white" },
                      axisLabel: { fontSize: 14, padding: 36, fill: "white" },
                      ticks: { stroke: "white" },
                      tickLabels: { fontSize: 10, padding: 5, fill: "white" },
                    }}
                  />
                  <VictoryArea
                    style={{
                      data: { fill: "blue", stroke: "cyan", strokeWidth: 4 },
                    }}
                    data={teamCountData}
                  />
                </VictoryChart>
              </div>
            </div>
          </Paper>
          <Paper>
            <div>
              <div className={classes.titleContainer}>
                <ScoreIcon className={classes.score} fontSize="small" />
                Score Progression
              </div>
              <div className={classes.chartWrapper}>
                <VictoryChart animate={{ duration: 500 }}>
                  <VictoryAxis
                    label="Timeline"
                    style={{
                      axis: { stroke: "white" },
                      axisLabel: { fontSize: 14, padding: 16, fill: "white" },
                      ticks: { stroke: "white" },
                      tickLabels: { fontSize: 15, padding: 5, fill: "white" },
                    }}
                    tickFormat={(t) => ``}
                  />
                  <VictoryAxis
                    dependentAxis
                    label="Score"
                    style={{
                      axis: { stroke: "white" },
                      axisLabel: { fontSize: 14, padding: 36, fill: "white" },
                      ticks: { stroke: "white" },
                      tickLabels: { fontSize: 10, padding: 5, fill: "white" },
                    }}
                  />
                  <VictoryArea
                    style={{
                      data: {
                        fill: "purple",
                        stroke: "violet",
                        strokeWidth: 4,
                      },
                    }}
                    data={scoreData}
                  />
                </VictoryChart>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </Scrollbars>
  );
}
