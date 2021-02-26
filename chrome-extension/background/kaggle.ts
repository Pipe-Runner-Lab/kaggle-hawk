import { FireStore } from "./firebase.utils";
import { save } from "../common/store.utils";
import { StoreKey } from "../common/type";
import { debounce } from "lodash";

const refreshKaggleList = debounce(
  async function () {
    console.log("Fetching Kaggle list...");

    await save(StoreKey.KAGGLE_DATA_LOADING, true);

    const kaggleList = await FireStore.getKaggleCompetitions();
    const kaggleLeaderboard = await FireStore.getKaggleLeaderboards();
    const kaggleDiffs = await FireStore.getKaggleDifs();

    await save(StoreKey.KAGGLE_CONTEST, kaggleList);
    await save(StoreKey.KAGGLE_LEADERBOARD, kaggleLeaderboard);
    await save(StoreKey.KAGGLE_DIFFS, kaggleDiffs);

    await save(StoreKey.KAGGLE_DATA_LOADING, false);

    console.info("Kaggle list refreshed...");
  },
  5000,
  {
    trailing: false,
    leading: true,
  }
);

export const Kaggle = {
  refreshKaggleList,
};
