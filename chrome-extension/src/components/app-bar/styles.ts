import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "42px",
    backgroundColor: "#333",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(0, 2),
  },
}));
