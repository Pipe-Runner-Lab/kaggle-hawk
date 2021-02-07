import { FireStore } from "./firebase.utils";
import { save } from "../common/store.utils";
import { StoreKey } from "../common/type";

export namespace Kaggle {
  export async function refreshKaggleList() {
    const kaggleList = await FireStore.getKaggleCompetitions();
    const kaggleLeaderboard = await FireStore.getKaggleLeaderboards();
    await save({
      [StoreKey.KAGGLE_CONTEST]: kaggleList,
    });
    await save({
      [StoreKey.KAGGLE_LEADERBOARD]: kaggleLeaderboard,
    });
  }
}
