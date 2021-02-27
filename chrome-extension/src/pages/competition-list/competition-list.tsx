import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import DataContext from "../../contexts/data-context";
import CompetitionCard from "./components/competition-card";
import Loading from "../../components/loading";
import { SortKeys } from "../../types/sort";
import { sortByTimeLeft, sortByTimeLeftOp } from "../../utils/sort";
import NotFound from "../../components/not-found";
import { useStyles } from "./styles";
import EmptyList from "../../components/empty-list/empty-list";

const sort = (sortKey: SortKeys) => (list: any[]) => {
  switch (sortKey) {
    case SortKeys.TIME_LEFT:
      return list.sort(sortByTimeLeft);
    case SortKeys.TIME_LEFT_OP:
      return list.sort(sortByTimeLeftOp);
    default:
      return list;
  }
};

export default function CompetitionList() {
  const classes = useStyles();
  const {
    kaggleMap,
    kaggleLeaderboardMap,
    toggleWatchListId,
    sortKey,
    error,
    kaggleDataLoading,
  } = useContext(DataContext);

  const filteredList = sort(sortKey)(Object.values(kaggleMap));

  if (error) {
    return <NotFound />;
  }

  if (kaggleDataLoading) {
    return <Loading />;
  }

  return Object.values(kaggleMap).length === 0 ? (
    <EmptyList label="Competition List Empty..."/>
  ) : (
    <Scrollbars autoHide>
      <div className={classes.root}>
        {filteredList.map((item, idx) => {
          return (
            <CompetitionCard
              key={idx}
              leaderboard={kaggleLeaderboardMap[item.id]}
              {...item}
              toggleWatchListId={toggleWatchListId}
            />
          );
        })}
      </div>
    </Scrollbars>
  );
}
