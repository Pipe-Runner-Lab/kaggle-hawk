import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
}));
