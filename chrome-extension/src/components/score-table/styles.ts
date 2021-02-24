import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  column1: {
    width: "20px",
  },
  tableHeader: {
    textAlign: "left",
  },
  tableHeaderColor: {
    color: "#a7ffeb",
  },
  tableRow: {},
  cell: {
    padding: theme.spacing(1),
  },
  rankColor: {
    color: "#84ffff",
  },
  table: {
    borderSpacing: "0px",
  },
  teamName: {
    width: "100px",
  },
}));
