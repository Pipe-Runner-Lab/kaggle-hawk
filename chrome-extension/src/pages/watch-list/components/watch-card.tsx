import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CustomProgressBar from "../../../components/custom-progress-bar";
import CardGiftcardOutlinedIcon from "@material-ui/icons/CardGiftcardOutlined";
import LinkIcon from "@material-ui/icons/Link";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TimerIcon from "@material-ui/icons/Timer";
import SaveIcon from "@material-ui/icons/Save";
import moment from "moment";
import Spacer from "../../../components/spacer";
import { Divider, IconButton } from "@material-ui/core";
import { LeaderboardItem, SanitizedList } from "../../../types/kaggle";
import { truncate } from "../../../utils/text";
import ScoreTable from "../../../components/score-table";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    flex: 1,
  },
  titleContainer: {
    display: "flex",
    fontSize: "14px",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "4px 4px 0px 0px",
  },
  cardContentContainer: {
    padding: theme.spacing(2),
  },
  money: {
    color: "#ffca28",
    fontSize: "10px",
    fontWeight: 500,
    lineHeight: "20px",
  },
  prizes: {
    color: "#76ff03",
  },
  knowledge: {
    color: "#18ffff",
  },
  kudos: {
    color: "#ff80ab",
  },
  people: {
    color: "#26c6da",
  },
  category: {
    color: "#ffd54f",
  },
  metric: {
    color: "#9575cd",
  },
  save: {
    color: "#f06292",
  },
  link: {
    color: "#26c6da",
  },
  watchActive: {
    color: "#ffea00",
  },
  watchInactive: {
    color: "#00796b",
  },
  secondaryContent: {
    display: "flex",
    margin: theme.spacing(0, 0, 2, 0),
  },
  infoContainer: {
    "& > * + *": {
      margin: theme.spacing(1, 0, 0, 0),
    },
  },
  infoBlock: {
    display: "flex",
    alignItems: "center",
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 2),
    },
    fontSize: "13px",
  },
  additionalActionsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    "& > * + *": {
      margin: theme.spacing(1, 0, 0, 0),
    },
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  tertiaryContent: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, 0, 0, 0),
  },
  scoreBoard: {
    fontSize: "16px",
    fontWeight: 700,
    height: "80px",
    width: "80px",
    border: "1px white dashed",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ccff90",
  },
  rankList: {},
}));

type WatchCardProps = {
  toggleWatchListId: (id: number) => void;
  leaderboard: LeaderboardItem[];
};

export default function WatchCard({
  category,
  deadline,
  evaluationMetric,
  id,
  maxDailySubmissions,
  maxTeamSize,
  reference,
  reward,
  teamCount,
  title,
  url,
  enabledDate,
  mergerDeadline,
  finishedFraction,
  isWatched,
  toggleWatchListId,
  leaderboard,
}: Partial<SanitizedList> & WatchCardProps) {
  const classes = useStyles();

  function renderReward(reward: string) {
    switch (reward) {
      case "Prizes":
        return (
          <CardGiftcardOutlinedIcon
            className={classes.prizes}
            fontSize="small"
          />
        );
      case "Knowledge":
        return (
          <SchoolOutlinedIcon className={classes.knowledge} fontSize="small" />
        );
      case "Kudos":
        return (
          <ThumbUpAltOutlinedIcon className={classes.kudos} fontSize="small" />
        );
      default:
        return <div className={classes.money}>{reward}</div>;
    }
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.titleContainer}>
        <span>{truncate(title, 46)}</span>
        <Spacer />
        {renderReward(reward)}
      </div>
      <CustomProgressBar variant="determinate" value={finishedFraction} />
      <div className={classes.cardContentContainer}>
        <div className={classes.secondaryContent}>
          <div className={classes.infoContainer}>
            <div className={classes.infoBlock}>
              <PeopleAltIcon className={classes.people} fontSize="small" />
              {maxTeamSize !== null ? (
                <span>{`${teamCount} x ${maxTeamSize}`}</span>
              ) : (
                <span>{teamCount}</span>
              )}
            </div>
            <div className={classes.infoBlock}>
              <TimerIcon className={classes.category} fontSize="small" />
              <span>
                {moment(enabledDate).format("DD-MM-YYYY")}
                {` ⇒ `}
                {moment(deadline).format("DD-MM-YYYY")}
              </span>
            </div>
            {evaluationMetric !== null ? (
              <div className={classes.infoBlock}>
                <EqualizerIcon className={classes.metric} fontSize="small" />
                <span>{truncate(evaluationMetric, 40)}</span>
              </div>
            ) : null}
            <div className={classes.infoBlock}>
              <SaveIcon className={classes.save} fontSize="small" />
              <span>{maxDailySubmissions}</span>
            </div>
          </div>
          <Spacer />
          <div className={classes.additionalActionsContainer}>
            <IconButton className={classes.iconButton}>
              <LowPriorityIcon fontSize="small" />
            </IconButton>
            {category !== "Getting Started" && (
              <IconButton
                onClick={() => toggleWatchListId(id)}
                className={classes.iconButton}
              >
                <TrendingUpIcon
                  className={
                    isWatched ? classes.watchActive : classes.watchInactive
                  }
                  fontSize="small"
                />
              </IconButton>
            )}
            <IconButton className={classes.iconButton}>
              <LinkIcon className={classes.link} fontSize="small" />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div className={classes.tertiaryContent}>
          <div className={classes.rankList}>
            <ScoreTable data={leaderboard} limit={3} />
          </div>
          <Spacer />
          <div className={classes.scoreBoard}>{leaderboard[0].score}</div>
        </div>
      </div>
    </Paper>
  );
}
