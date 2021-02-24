import { FireStore } from "./firebase.utils";
import { save } from "../common/store.utils";
import { StoreKey } from "../common/type";

export namespace Kaggle {
  export async function refreshKaggleList() {
    console.log("Fetching Kaggle list...");

    const kaggleList = await FireStore.getKaggleCompetitions();
    const kaggleLeaderboard = await FireStore.getKaggleLeaderboards();
    const kaggleDiffs = await FireStore.getKaggleDifs();

    await save(StoreKey.KAGGLE_CONTEST, kaggleList);
    await save(StoreKey.KAGGLE_LEADERBOARD, kaggleLeaderboard);
    await save(StoreKey.KAGGLE_DIFFS, kaggleDiffs);

    console.info("Kaggle list refreshed...");
  }
}
