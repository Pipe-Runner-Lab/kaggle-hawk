import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  homeContainer: {
    flex: "1",
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
    display: "flex",
    flexDirection: "column",
  },
  homeContent: {
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
  bottomBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#333",
    justifyContent: "flex-end",
    height: "42px",
    padding: theme.spacing(1),
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
  PrimaryInfoWrapper: {
    display: "flex",
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 2),
    },
  },
  settings: {
    color: "#4dd0e1",
  },
  about: {
    color: "#ffd54f",
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  people: {
    color: "#26c6da",
    margin: theme.spacing(0, 2, 0, 0),
  },
  contest: {
    color: "#ffd54f",
    margin: theme.spacing(0, 2, 0, 0),
  },
  notification: {
    color: "#69f0ae",
    margin: theme.spacing(0, 2, 0, 0),
  },
  watch: {
    color: "#f44336",
    margin: theme.spacing(0, 2, 0, 0),
  },
  tickerContainer: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  secondaryInfoContainer: {
    display: "flex",
    "& > * + *": {
      margin: theme.spacing(0, 0, 0, 3),
    },
  },
  notificationContainer: {
    flex: 1,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "172px",
  },
  image: {
    width: "130px",
    height: "auto",
  },
}));
