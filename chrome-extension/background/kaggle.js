import {fireStore} from './firebase.utils';
import { store } from "./store.utils";

async function refreshKaggleList(){
  const kaggleList = await fireStore.getKaggleCompetitions();
  const kaggleLeaderboard = await fireStore.getKaggleLeaderboards();
  await store.save({
    [store.keys.KAGGLE_LIST]: kaggleList,
  });
  await store.save({
    [store.keys.KAGGLE_LEADERBOARD]: kaggleLeaderboard,
  });
}

export const kaggle = {
  refreshKaggleList
}