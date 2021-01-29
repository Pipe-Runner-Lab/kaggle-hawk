import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import DataContext from "../../contexts/data-context";
import { makeStyles } from "@material-ui/core/styles";
import CompetitionCard from "./components/competition-card";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
}));

export default function CompetitionList() {
  const { kaggleList } = useContext(DataContext);
  const classes = useStyles();

  return (
    <Scrollbars autoHide>
      <div className={classes.root}>
        {kaggleList.map((item, idx) => {
          const { ref, ...rest } = item;
          return <CompetitionCard key={idx} reference={ref} {...rest} />;
        })}
      </div>
    </Scrollbars>
  );
}
