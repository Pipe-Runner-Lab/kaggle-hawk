import { expect } from "chai";
import { kaggleScrapper } from "../src/utils/scrapper";
import * as puppeteer from "puppeteer";

describe("Scrapper tests...", () => {
  it("Checking for empty Kaggle response", async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const kaggleList = await kaggleScrapper(page);
    await browser.close();

    console.log(kaggleList);

    expect(kaggleList).to.be.an("array").to.be.not.empty;
  }).timeout(60000);;
});
