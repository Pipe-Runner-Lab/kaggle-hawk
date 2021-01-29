import browser from "webextension-polyfill";

export const keys = {
  KAGGLE_LIST: "KAGGLE_LIST",
};

async function save(object) {
  if( Object.keys(object).length !== 1 ){
    throw Error('One and only one key-value pair accepted');
  }

  const stringifiedObject = Object.keys(object).map((key) => ({
    [key]: JSON.stringify(object[key]),
  }));
  await browser.storage.local.set(stringifiedObject[0]);
  return;
}

async function retrieve(key) {
  const value = await browser.storage.local.get(key);
  return JSON.parse(value[key]);
}

export const store = {
  keys,
  save,
  retrieve
}
