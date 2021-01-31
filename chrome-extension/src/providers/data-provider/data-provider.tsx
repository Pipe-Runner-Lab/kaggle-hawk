import React, { useState, useEffect } from "react";
import { browser } from "webextension-polyfill-ts";
import DataContext from "../../contexts/data-context";
import { SortKeys } from "../../types/sort";
import { parseDates } from "../../utils/dates";
import {
  RawContestList,
  RawLeaderboardObject,
  SanitizedList,
} from "../../types/kaggle";
import { sortByTimeLeft, sortByTimeLeftOp } from "../../utils/sort";
import { useStore, useSyncStore } from "../../hooks/store";

function sanitizeKaggleList(
  data: RawContestList[],
  sortType: SortKeys,
  watchListIds: number[]
): SanitizedList[] {
  const cleanData = data.map((item) => {
    const { finishedFraction } = parseDates(
      item.enabledDate,
      item.mergerDeadline,
      item.deadline
    );

    return {
      category: item.category,
      deadline: item.deadline,
      description: item.description,
      evaluationMetric: item.evaluationMetric,
      id: item.id,
      maxDailySubmissions: item.maxDailySubmissions,
      maxTeamSize: item.maxTeamSize,
      reference: item.ref,
      reward: item.reward,
      tags: item.tags,
      teamCount: item.teamCount,
      title: item.title,
      url: item.url,
      enabledDate: item.enabledDate,
      mergerDeadline: item.mergerDeadline,
      finishedFraction,
      isWatched: watchListIds.indexOf(item.id) !== -1,
    };
  });

  switch (sortType) {
    case SortKeys.TIME_LEFT:
      return cleanData.sort(sortByTimeLeft);
    case SortKeys.TIME_LEFT_OP:
      return cleanData.sort(sortByTimeLeftOp);
    default:
      return cleanData;
  }
}

type DataProviderProps = {
  children: any;
};

export default function DataProvider({ children }: DataProviderProps) {
  const [kaggleList, setKaggleList, refreshKaggleList] = useStore<
    RawContestList[]
  >([], "KAGGLE_LIST");

  const [
    kaggleLeaderboard,
    setKaggleLeaderboard,
    refreshKaggleLeaderboard,
  ] = useStore<RawLeaderboardObject>({}, "KAGGLE_LEADERBOARD");

  const [watchListIds, setWatchListIds] = useSyncStore<number[]>(
    [],
    "WATCH_LIST_IDS"
  );

  const [sortKey, setSortKey] = useSyncStore<SortKeys>(
    SortKeys.NONE,
    "SORT_KEY"
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

  browser.storage.onChanged.addListener(() => {
    refreshKaggleList();
    // refreshKaggleLeaderboard();
  });

  // TODO: Sync with sync store
  const sanitizedList = sanitizeKaggleList(kaggleList, sortKey, watchListIds);

  return (
    <DataContext.Provider
      value={{
        kaggleList: sanitizedList,
        kaggleLeaderboard,
        watchListIds,
        toggleWatchListId,
        updateSortKey,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
