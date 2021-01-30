import { createContext } from "react";
import { SortKeys } from "../../types/sort";
import { RawLeaderboardObject, SanitizedList } from "../../types/kaggle";

const dataContext = createContext<{
  kaggleList: SanitizedList[];
  kaggleLeaderboard: RawLeaderboardObject;
  watchListIds: number[];
  toggleWatchListId: (id: number) => void;
  updateSortKey: (key: SortKeys) => void;
}>({
  kaggleList: [],
  kaggleLeaderboard: {},
  watchListIds: [],
  toggleWatchListId: (id: number) => {},
  updateSortKey: (key: SortKeys) => {},
});

export default dataContext;
