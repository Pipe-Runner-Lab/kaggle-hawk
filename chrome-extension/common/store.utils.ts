import { browser } from "webextension-polyfill-ts";
import { Serializable } from "./type";

export async function save(key: string, value: Serializable): Promise<void> {
  const stringifiedObject = {
    [key]: JSON.stringify(value),
  };
  return browser.storage.local.set(stringifiedObject);
}

export async function retrieve(key: string): Promise<any | void> {
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
