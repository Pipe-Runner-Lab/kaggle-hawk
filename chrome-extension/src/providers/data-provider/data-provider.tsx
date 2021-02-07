import React from "react";
import DataContext from "../../contexts/data-context";
import { SortKeys } from "../../types/sort";
import { parseDates } from "../../utils/dates";
import {
  ContestMapType,
  LeaderboardMapType,
  SanitizedContestMapType,
  KaggleDiffsMapType,
} from "../../types/kaggle";
import { useStore, useSyncStore } from "../../hooks/store";
import { StoreKey } from "../../../common/type";

function sanitizedContestMapGenerator(
  data: ContestMapType,
  watchListIds: number[]
): SanitizedContestMapType {
  let sanitizedContestMap: SanitizedContestMapType = {};
  const contestKeys = Object.keys(data);
  contestKeys.forEach((id, idx) => {
    const contest = data[id];
    const { finishedFraction } = parseDates(
      contest.enabledDate,
      contest.mergerDeadline,
      contest.deadline
    );
    const { ref, ...rest } = contest;

    sanitizedContestMap = {
      ...sanitizedContestMap,
      [id]: {
        ...rest,
        reference: ref,
        finishedFraction,
        isWatched: watchListIds.indexOf(contest.id) !== -1,
      },
    };
  });

  return sanitizedContestMap;
}

type DataProviderProps = {
  children: any;
};

export default function DataProvider({ children }: DataProviderProps) {
  const [kaggleMap, setKaggleMap, refreshKaggleMap] = useStore<ContestMapType>(
    {},
    StoreKey.KAGGLE_CONTEST
  );

  const [
    kaggleLeaderboardMap,
    setKaggleLeaderboardMap,
    refreshKaggleLeaderboardMap,
  ] = useStore<LeaderboardMapType>({}, StoreKey.KAGGLE_LEADERBOARD);

  const [
    kaggleDiffsMap,
    setKaggleDiffsMap,
    refreshKaggleDiffsMap,
  ] = useStore<KaggleDiffsMapType>({}, StoreKey.KAGGLE_DIFFS);

  const [watchListIds, setWatchListIds] = useSyncStore<number[]>(
    [],
    StoreKey.WATCH_LIST_IDS
  );

  const [sortKey, setSortKey] = useSyncStore<SortKeys>(
    SortKeys.NONE,
    StoreKey.SORT_KEY
  );

  function updateSortKey(key: SortKeys) {
    setSortKey(key);
  }

  function toggleWatchListId(id: number) {
    if (watchListIds.indexOf(id) === -1) {
      setWatchListIds([...watchListIds, id]);
    } else {
      setWatchListIds(watchListIds.filter((item: number) => item !== id));
    }
  }

  // TODO: Sync with sync store
  // browser.storage.onChanged.addListener(() => {
  // refreshKaggleMap();
  // refreshKaggleLeaderboardMap();
  // });

  const sanitizedContestMap = sanitizedContestMapGenerator(
    kaggleMap,
    watchListIds
  );

  return (
    <DataContext.Provider
      value={{
        sortKey,
        kaggleMap: sanitizedContestMap,
        kaggleLeaderboardMap,
        kaggleDiffsMap,
        watchListIds,
        toggleWatchListId,
        updateSortKey,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
