import { browser } from "webextension-polyfill-ts";
import { FireBase } from "./firebase.utils";
import { Kaggle } from "./kaggle";
import { AlarmName, REFRESH_RATE } from "./types";

browser.runtime.onInstalled.addListener(() => {
  FireBase.initializeApp();
  // browser.storage.local.clear();
  // browser.storage.sync.clear();
  Kaggle.refreshKaggleList();
  browser.alarms.create(AlarmName.REFRESH_KAGGLE_LIST, {
    delayInMinutes: REFRESH_RATE * 60,
    periodInMinutes: REFRESH_RATE * 60,
  });
});

browser.runtime.onStartup.addListener(() => {
  FireBase.initializeApp();
  Kaggle.refreshKaggleList();
});

browser.runtime.onMessage.addListener((message: any, sender) => {
  FireBase.initializeApp();
  const key = message.message;
  switch (key) {
    case "REFRESH_KAGGLE_LIST":
      Kaggle.refreshKaggleList();
      break;
  }
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case AlarmName.REFRESH_KAGGLE_LIST:
      await Kaggle.refreshKaggleList();
      break;
  }
});
