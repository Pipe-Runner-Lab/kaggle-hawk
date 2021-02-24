import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  billboard: {
    flex: 1,
    border: "1px dashed white",
    borderRadius: "6px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  billboardContent: {
    flex: 1,
    display: "flex",
    fontSize: "34px",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4, 2),
    backgroundColor: "#2e2e2e",
  },
  billboardTitle: {
    display: "flex",
    fontSize: "11px",
    padding: theme.spacing(1, 2),
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#404040",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#2e2e2e",
  },
  image: {
    height: "60px",
    width: "auto",
  },
  inActive: {
    filter: "grayscale(100%)",
  },
}));
