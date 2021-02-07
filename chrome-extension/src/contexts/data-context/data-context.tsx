import { createContext } from "react";
import { SortKeys } from "../../types/sort";
import {
  ContestMapType,
  KaggleDiffsMapType,
  LeaderboardMapType,
  SanitizedContestMapType,
} from "../../types/kaggle";

const dataContext = createContext<{
  sortKey: SortKeys | null;
  kaggleMap: SanitizedContestMapType;
  kaggleLeaderboardMap: LeaderboardMapType;
  kaggleDiffsMap: KaggleDiffsMapType;
  watchListIds: number[];
  toggleWatchListId: (id: number) => void;
  updateSortKey: (key: SortKeys) => void;
}>({
  sortKey: null,
  kaggleMap: {},
  kaggleLeaderboardMap: {},
  kaggleDiffsMap: {},
  watchListIds: [],
  toggleWatchListId: (id: number) => {},
  updateSortKey: (key: SortKeys) => {},
});

export default dataContext;
