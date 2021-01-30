import { browser } from "webextension-polyfill-ts";

export async function retrieve(key: string) {
  const value = await browser.storage.local.get(key);
  try {
    return JSON.parse(value[key]);
  } catch (error) {
    console.log(error, value);
    return null;
  }
}

export async function syncSave(key: string, value: any) {
  await browser.storage.sync.set({
    [key]: value,
  });
  return;
}

export async function syncRetrieve(key: string) {
  const value = await browser.storage.sync.get([key]);
  return value[key];
}
