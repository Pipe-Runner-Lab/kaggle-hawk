import * as admin from "firebase-admin";
import { KaggleContestItem, KaggleLeaderboardItem } from "../types/basic";

async function updateContestList(list: KaggleContestItem[]): Promise<any> {
  if (!list) {
    console.warn("Empty kaggle list");
    return null;
  }

  try {
    const db = admin.firestore();
    const ref = db.collection("kaggle").doc("contests");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return ref.update({
        list,
      });
    }
    console.error("[contests] document missing in Kaggle");
    return;
  } catch (error) {
    console.error("Error updating kaggle contests list");
    return;
  }
}

async function updateLeaderboardList(contests: {
  [key: string]: KaggleLeaderboardItem[];
}): Promise<any> {
  try {
    const db = admin.firestore();
    const ref = db.collection("kaggle").doc("leaderboards");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return ref.update({
        contests,
      });
    }
    console.error("[leaderboards] document missing in Kaggle");
    return;
  } catch (error) {
    console.error("Error updating kaggle leaderboards list");
    return;
  }
}

export const kaggleUpdate = {
  updateContestList,
  updateLeaderboardList,
};
