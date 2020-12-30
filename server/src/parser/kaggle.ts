import * as puppeteer from 'puppeteer';
import { KAGGLE_CONTEST_PAGE } from './urls';

export const generateKaggleJSON = async (): Promise<void> => {
  const browser = await puppeteer.launch();
  const newPage = await browser.newPage();
  await newPage.goto(KAGGLE_CONTEST_PAGE);
  const HTMLContent = await newPage.content;
  console.log('HTML Content follows');
  console.log(HTMLContent);

  await browser.close();
};
