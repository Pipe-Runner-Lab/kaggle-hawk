import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { refreshContestList } from "./contests";

admin.initializeApp();

export const refreshContestList_cf = functions
  .runWith({
    memory: "1GB",
  })
  .pubsub.schedule("every 12 hours")
  .onRun(async (context) => {
    await refreshContestList();
    return
  });

/**
 * Test Endpoints
 */
export const refreshContestList_cf_test = functions.https.onRequest(
  async (req, res) => {
    await refreshContestList();
    res.send("Update Contest List CF function test complete")
    return
  }
);
