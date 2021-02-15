import { browser } from "webextension-polyfill-ts";

// TODO : Improve store for multi key and complex key storage

export async function save(data: Record<string, any>): Promise<void> {
  if (Object.keys(data).length !== 1) {
    throw Error("One and only one key-value pair accepted");
  }

  const stringifiedObject = Object.keys(data).map((key) => ({
    [key]: JSON.stringify(data[key]),
  }));
  await browser.storage.local.set(stringifiedObject[0]);
  return;
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

