import * as admin from "firebase-admin";
import {
  KaggleContestItem,
  KaggleDiffItem,
  KaggleLeaderboardItem,
} from "../types/basic";

async function updateContestList(
  contestMap: Record<string, KaggleContestItem>
): Promise<any> {
  try {
    const db = admin.firestore();
    const ref = db.collection("kaggle").doc("contests");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return ref.update({
        map: contestMap,
      });
    }
    console.error("[contests] document missing in Kaggle");
    return;
  } catch (error) {
    console.error("Error updating kaggle contests list");
    return;
  }
}

async function updateLeaderboardList(
  leaderboardMap: Record<string, KaggleLeaderboardItem[]>
): Promise<any> {
  try {
    const db = admin.firestore();
    const ref = db.collection("kaggle").doc("leaderboards");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return ref.update({
        map: leaderboardMap,
      });
    }
    console.error("[leaderboards] document missing in Kaggle");
    return;
  } catch (error) {
    console.error("Error updating kaggle leaderboards list");
    return;
  }
}

async function getDiffsMap(): Promise<Record<string, KaggleDiffItem> | void> {
  try {
    const db = admin.firestore();
    const ref = db.collection("kaggle").doc("diffs");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return snapshot.data().map;
    }
    console.error("[diffs] document missing in Kaggle");
    return;
  } catch (error) {
    console.error("Error fetching kaggle diffs list");
    return;
  }
}

async function updateDiff(
  diffMap: Record<string, KaggleDiffItem>
): Promise<any> {
  try {
    const db = admin.firestore();
    const ref = db.collection("kaggle").doc("diffs");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return ref.update({
        map: diffMap,
      });
    }
    console.error("[diffs] document missing in Kaggle");
    return;
  } catch (error) {
    console.error("Error updating kaggle diffs list");
    return;
  }
}

export const kaggleUpdate = {
  updateContestList,
  updateLeaderboardList,
  getDiffsMap,
  updateDiff,
};
