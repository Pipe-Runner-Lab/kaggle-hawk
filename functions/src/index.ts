import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { kaggle } from "./contests/kaggle.list";

admin.initializeApp();

export const refreshContestList_cf = functions.pubsub
  .schedule("every 12 hours")
  .onRun(async (context) => {
    await kaggle.refreshContestList();
    return;
  });

/**
 * Test Endpoints
 */
export const refreshContestList_cf_test = functions.https.onRequest(
  async (req, res) => {
    await kaggle.refreshContestList();
    res.send("Update Contest List CF function test complete");
    return;
  }
);
