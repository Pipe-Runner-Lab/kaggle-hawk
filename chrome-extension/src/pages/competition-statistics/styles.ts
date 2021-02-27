import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  container: {
    flex: "1",
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
    display: "flex",
    flexDirection: "column",
  },
  chartWrapper: {
    padding: theme.spacing(2, 0, 2, 2),
  },
  titleContainer: {
    display: "flex",
    fontSize: "14px",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "4px 4px 0px 0px",
  },
  participation: {
    color: "#26c6da",
    margin: theme.spacing(0, 2, 0, 0),
  },
  score: {
    color: "#ffea00",
    margin: theme.spacing(0, 2, 0, 0),
  },
}));
