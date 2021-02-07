import { browser } from "webextension-polyfill-ts";
import { FireBase } from "./firebase.utils";
import { Kaggle } from "./kaggle";
import { AlarmName, REFRESH_RATE } from "./types";

browser.runtime.onInstalled.addListener(() => {
  FireBase.initializeApp();
  // browser.storage.local.clear();
  // browser.storage.sync.clear();
  Kaggle.refreshKaggleList().then(() => {
    console.info("kaggle list refreshed...");
  });
  console.info("Background script initiated...");
});

browser.alarms.create(AlarmName.REFRESH_KAGGLE_LIST, {
  delayInMinutes: REFRESH_RATE * 60,
  periodInMinutes: REFRESH_RATE * 60,
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case AlarmName.REFRESH_KAGGLE_LIST:
      await Kaggle.refreshKaggleList();
      console.info("kaggle list refreshed...");
      break;
    default:
      break;
  }
});
