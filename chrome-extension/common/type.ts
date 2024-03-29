export enum StoreKey {
  KAGGLE_CONTEST = "KAGGLE_CONTEST",
  KAGGLE_LEADERBOARD = "KAGGLE_LEADERBOARD",
  KAGGLE_DIFFS = "KAGGLE_DIFFS",
  WATCH_LIST_IDS = "WATCH_LIST_IDS",
  SORT_KEY = "SORT_KEY",
  KAGGLE_DATA_LOADING = "KAGGLE_DATA_LOADING"
}

export type Serializable = string | boolean | number | object | Serializable[];
