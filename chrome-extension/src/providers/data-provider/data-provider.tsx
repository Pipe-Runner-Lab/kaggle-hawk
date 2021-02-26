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
import { browser } from "webextension-polyfill-ts";

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
  const {
    state: kaggleMap,
    setState: setKaggleMap,
    loading: kaggleMapLoading,
    error: kaggleMapError,
  } = useStore<ContestMapType>({}, StoreKey.KAGGLE_CONTEST);

  const {
    state: kaggleLeaderboardMap,
    setState: setKaggleLeaderboardMap,
    loading: kaggleLeaderboardLoading,
    error: kaggleLeaderboardError,
  } = useStore<LeaderboardMapType>({}, StoreKey.KAGGLE_LEADERBOARD);

  const {
    state: kaggleDiffsMap,
    setState: setKaggleDiffsMap,
    loading: kaggleDiffsLoading,
    error: kaggleDiffsError,
  } = useStore<KaggleDiffsMapType>({}, StoreKey.KAGGLE_DIFFS);

  const { state: kaggleDataLoading } = useStore<boolean>(
    false,
    StoreKey.KAGGLE_DATA_LOADING
  );

  const { state: watchListIds, setState: setWatchListIds } = useSyncStore<
    number[]
  >([], StoreKey.WATCH_LIST_IDS);

  const { state: sortKey, setState: setSortKey } = useSyncStore<SortKeys>(
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

  const sanitizedContestMap = sanitizedContestMapGenerator(
    kaggleMap,
    watchListIds
  );

  const error =
    !kaggleDataLoading &&
    (kaggleDiffsError || kaggleLeaderboardError || kaggleMapError);

  // if on open, no data found in cache
  error &&
    browser.runtime.sendMessage({
      message: "REFRESH_KAGGLE_LIST",
    });

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
        error,
        kaggleDataLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
