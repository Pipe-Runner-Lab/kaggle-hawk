import browser from "webextension-polyfill";
import { initializeApp, fireStoreQuery } from "./firebase.utils";

initializeApp();

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color: "#3aa757" }, () => {
//     console.log("The color is green.");
//   });
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
//   console.log("Hehehe");
//   sendResponse("Hohoho");
// })

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({ color: "#3aa757" }).then(() => {
    console.log("local store set");
  });
  console.log("Aur bhai sb bahdiya?");
});

browser.runtime.onMessage.addListener(async (msg, sender) => {
  console.log("BG page received message", msg, "from", sender);
  // return sendResponse("Hohoho");

  const contestList = await fireStoreQuery.getKaggleCompetitions();
  console.log(contestList);
});
