import * as admin from "firebase-admin";
import { KaggleContestItem } from "../types/basic";

export async function updateKaggleDoc(list: KaggleContestItem[]): Promise<any> {
  if (!list) {
    console.warn("Empty kaggle list");
    return null;
  }

  try {
    const db = admin.firestore();
    const ref = db.collection("contest_sites").doc("kaggle");
    const snapshot = await ref.get();
    if (snapshot.exists) {
      return ref.update({
        contests: list,
      });
    }
    return null;
  } catch (error) {
    throw Error("Error updating kaggle list");
  }
}
