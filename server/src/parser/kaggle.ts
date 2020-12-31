import * as puppeteer from 'puppeteer';
import { KAGGLE_CONTEST_PAGE } from './urls';

export const generateKaggleJSON = async (): Promise<void> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(KAGGLE_CONTEST_PAGE, {
    waitUntil: ['networkidle2'],
  });
  const competitionList = await page.evaluate(() => {
    const listItems = document.querySelectorAll(
      'div.sc-pkryX.tCtqx li.mdc-list-item',
    );
    const data = [];
    listItems.forEach((item) => {
      const title = item.querySelector('.mdc-list-item__primary-text')
        .textContent;
      const description = item.querySelector('.hMdDCJ').textContent;
      const link = item.querySelector('a').href;
      const iconUrl = item.querySelector('img').src;
      const secondaryDescription = item.querySelector('.jTyItw').textContent;

      console.log(title);
      data.concat({
        title,
        description,
        link,
        iconUrl,
        secondaryDescription,
      });
    });

    return data;
  });

  console.log(competitionList);
  await browser.close();
};
