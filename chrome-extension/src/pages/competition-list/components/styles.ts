import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
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
  secondaryContent: {
    display: "flex",
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
}));
