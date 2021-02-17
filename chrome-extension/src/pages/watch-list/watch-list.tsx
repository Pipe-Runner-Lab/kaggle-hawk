import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import EmptyWatchList from "../../components/empty-watch-list";
import Loading from "../../components/loading";
import NotFound from "../../components/not-found";
import DataContext from "../../contexts/data-context";
import WatchCard from "./components/watch-card";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > * + *": {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
}));

export default function WatchList() {
  const classes = useStyles();
  const {
    kaggleMap,
    kaggleLeaderboardMap,
    toggleWatchListId,
    watchListIds,
    error,
    kaggleDataLoading,
  } = useContext(DataContext);

  const filteredList = Object.values(kaggleMap);

  if (error) {
    return <NotFound />;
  }

  if (kaggleDataLoading) {
    return <Loading />;
  }

  return watchListIds.length === 0 ? (
    <EmptyWatchList />
  ) : (
    <Scrollbars autoHide>
      <div className={classes.root}>
        {filteredList
          .filter((item) => watchListIds.indexOf(item.id) !== -1)
          .map((item, idx) => {
            return (
              <WatchCard
                leaderboard={kaggleLeaderboardMap[item.id]}
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
