import { browser } from "webextension-polyfill-ts";

export async function retrieve(key: string) {
  const value = await browser.storage.local.get(key);
  return JSON.parse(value[key]);
}
