import React from "react";
import Paper from "@material-ui/core/Paper";
import CustomProgressBar from "../../../components/custom-progress-bar";
import CardGiftcardOutlinedIcon from "@material-ui/icons/CardGiftcardOutlined";
import LinkIcon from "@material-ui/icons/Link";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import SaveIcon from "@material-ui/icons/Save";
import Spacer from "../../../components/spacer";
import { IconButton } from "@material-ui/core";
import { LeaderboardType, SanitizedContestType } from "../../../types/kaggle";
import { truncate } from "../../../utils/text";
import { useStyles } from "./styles";

type CompetitionCardProps = {
  toggleWatchListId: (id: number) => void;
  leaderboard: LeaderboardType[];
};

export default function CompetitionCard({
  category,
  deadline,
  description,
  evaluationMetric,
  id,
  maxDailySubmissions,
  maxTeamSize,
  reference,
  reward,
  tags,
  teamCount,
  title,
  url,
  enabledDate,
  mergerDeadline,
  finishedFraction,
  isWatched,
  toggleWatchListId,
  leaderboard,
}: SanitizedContestType & CompetitionCardProps) {
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
        <div className={classes.descriptionContainer}>
          <span>{truncate(description, 70)}</span>
        </div>
        <div className={classes.chipContainer}>
          {tags.map((item, idx) => (
            <span key={idx} className={classes.chip}>
              {item}
            </span>
          ))}
        </div>
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
              <BubbleChartIcon className={classes.category} fontSize="small" />
              <span>{category}</span>
            </div>
            {evaluationMetric && (
              <div className={classes.infoBlock}>
                <EqualizerIcon className={classes.metric} fontSize="small" />
                <span>{truncate(evaluationMetric, 40)}</span>
              </div>
            )}
            <div className={classes.infoBlock}>
              <SaveIcon className={classes.save} fontSize="small" />
              <span>{maxDailySubmissions}</span>
            </div>
          </div>
          <Spacer />
          <div className={classes.additionalActionsContainer}>
            {category !== "Getting Started" && leaderboard?.length >= 3 && (
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
            <IconButton
              onClick={(event) => {
                event.preventDefault();
                window.open(url);
              }}
              className={classes.iconButton}
            >
              <LinkIcon className={classes.link} fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </Paper>
  );
}
