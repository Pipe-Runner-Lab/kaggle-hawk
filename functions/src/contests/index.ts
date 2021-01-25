import * as puppeteer from "puppeteer";
import { KaggleContestItem } from "../types/basic";
import { kaggleScrapper } from "../utils/scrapper";
import { updateKaggleDoc } from "../utils/update";

export async function generateContestList(): Promise<{
  kaggle: KaggleContestItem[];
}> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const kaggleList = await kaggleScrapper(page);

  await browser.close();
  return { kaggle: kaggleList };
}

export async function updateContestList_fs(list: {
  kaggle: KaggleContestItem[];
}): Promise<any> {
  try {
    return Promise.all([updateKaggleDoc(list.kaggle)]);
  } catch (error) {
    console.error("Error updating contest list", error);
  }
}
