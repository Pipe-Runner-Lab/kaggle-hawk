import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { updateContestList, updateContestList_fs } from "./contests/index";

admin.initializeApp();

export const updateContestList_cf = functions
  .runWith({
    memory: "1GB",
  })
  .pubsub.schedule("every 12 hours")
  .onRun(async (context) => {
    const list = await updateContestList();
    return updateContestList_fs(list);
  });
