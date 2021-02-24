import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "200px",
    height: "auto",
  },
  loadingText: {
    margin: theme.spacing(2, 0, 0, 0),
    color: theme.palette.action.disabled,
    fontSize: "12px",
    fontWeight: 700,
  },
}));
