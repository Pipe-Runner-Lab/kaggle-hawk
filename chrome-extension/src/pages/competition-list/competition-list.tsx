import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import DataContext from "../../contexts/data-context";
import { makeStyles } from "@material-ui/core/styles";
import CompetitionCard from "./components/competition-card";
import Loading from "../../components/loading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
}));

export default function CompetitionList() {
  const { kaggleList, toggleWatchListId } = useContext(DataContext);
  // TODO: filter goes here

  const classes = useStyles();

  return kaggleList.length === 0 ? (
    <Loading />
  ) : (
    <Scrollbars autoHide>
      <div className={classes.root}>
        {kaggleList.map((item, idx) => {
          return (
            <CompetitionCard
              key={idx}
              {...item}
              toggleWatchListId={toggleWatchListId}
            />
          );
        })}
      </div>
    </Scrollbars>
  );
}
