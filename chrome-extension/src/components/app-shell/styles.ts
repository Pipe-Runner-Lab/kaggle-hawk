import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    height: "580px",
    display: "flex",
    flexDirection: "column",
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  iconGroup: {
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  contentContainer: {
    backgroundColor: "#191919",
    flex: 1,
    overflow: "hidden",
  },
}));
