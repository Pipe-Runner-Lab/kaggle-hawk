import browser from "webextension-polyfill";
import { fireBase, fireStore } from "./firebase.utils";
import { store } from "./store.utils";

browser.runtime.onInstalled.addListener(() => {
  fireBase.initializeApp();
  console.info("Background script initiated...");
});

browser.alarms.create("REFRESH_KAGGLE_LIST", {
  delayInMinutes: 1,
  periodInMinutes: 720,
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case "REFRESH_KAGGLE_LIST":
      console.info("kaggle list refreshed...");
      const contestList = await fireStore.getKaggleCompetitions();
      await store.save({
        [store.keys.KAGGLE_LIST]: contestList.contests,
      });
      break;
    default:
      break;
  }
});
