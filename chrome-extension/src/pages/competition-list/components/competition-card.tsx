import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CustomProgressBar from "../../../components/custom-progress-bar";
import CardGiftcardOutlinedIcon from "@material-ui/icons/CardGiftcardOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import SaveIcon from "@material-ui/icons/Save";
import moment from "moment";
import Spacer from "../../../components/spacer";

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
  descriptionContainer: {
    display: "flex",
    fontSize: "11px",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  money: {
    color: "#ffca28",
    fontSize: "10px",
    fontWeight: 500,
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
  chipContainer: {
    margin: theme.spacing(2, 0, 0, 0),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
  chip: {
    fontSize: "10px",
    borderRadius: "4px",
    backgroundColor: "#00796b",
    padding: theme.spacing(1),
  },
  infoContainer: {
    margin: theme.spacing(2, 0, 0, 0),
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
}));

type CompetitionCardProps = {
  awardsPoints: boolean;
  category: string;
  deadline: string;
  description: string;
  evaluationMetric: string;
  id: number;
  isKernelsSubmissionsOnly: boolean;
  maxDailySubmissions: 5;
  maxTeamSize: 5;
  organizationName: string;
  reference: string;
  reward: string;
  submissionsDisabled: boolean;
  tags: string[];
  teamCount: number;
  title: string;
  url: string;
  enabledDate: string;
  mergerDeadline: string | null;
};

function truncate(text: string, limit: number): string {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
}

function parseDates(
  enabledDate: string,
  mergerDeadline: string | null,
  deadline: string
) {
  const start = moment(enabledDate);
  const end = moment(deadline);
  const merger = moment(mergerDeadline);

  const totalDays = end.diff(start, "days");
  const elapsedDays = moment().diff(start, "days");
  const mergerDays = mergerDeadline ? merger.diff(start, "days") : null;

  return {
    finishedFraction: (100 * elapsedDays) / totalDays,
    mergerFraction: (100 * mergerDays) / totalDays,
  };
}

export default function CompetitionCard({
  awardsPoints,
  category,
  deadline,
  description,
  evaluationMetric,
  id,
  isKernelsSubmissionsOnly,
  maxDailySubmissions,
  maxTeamSize,
  organizationName,
  reference,
  reward,
  submissionsDisabled,
  tags,
  teamCount,
  title,
  url,
  enabledDate,
  mergerDeadline,
}: CompetitionCardProps) {
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

  const { finishedFraction } = parseDates(
    enabledDate,
    mergerDeadline,
    deadline
  );

  console.log(finishedFraction);

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
      </div>
    </Paper>
  );
}
