import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import EmptyWatchList from "../../components/empty-watch-list";
import Loading from "../../components/loading";
import DataContext from "../../contexts/data-context";
import CompetitionCard from "../competition-list/components/competition-card";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
}));

export default function WatchList() {
  const { kaggleList, toggleWatchListId, watchListIds } = useContext(
    DataContext
  );

  const classes = useStyles();

  return kaggleList.length === 0 ? (
    <Loading />
  ) : watchListIds.length === 0 ? (
    <EmptyWatchList />
  ) : (
    <Scrollbars autoHide>
      <div className={classes.root}>
        {kaggleList
          .filter((item) => watchListIds.indexOf(item.id) !== -1)
          .map((item, idx) => {
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
