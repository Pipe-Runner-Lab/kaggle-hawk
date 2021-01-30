import browser from "webextension-polyfill";
import { fireBase } from "./firebase.utils";
import { kaggle } from "./kaggle";

browser.runtime.onInstalled.addListener(() => {
  fireBase.initializeApp();
  // browser.storage.local.clear();
  kaggle.refreshKaggleList().then(() => {
    console.info("kaggle list refreshed...");
  });
  console.info("Background script initiated...");
});

browser.alarms.create("REFRESH_KAGGLE_LIST", {
  delayInMinutes: 720,
  periodInMinutes: 720,
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case "REFRESH_KAGGLE_LIST":
      await kaggle.refreshKaggleList();
      console.info("kaggle list refreshed...");
      break;
    default:
      break;
  }
});
