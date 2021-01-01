import { KaggleItem } from 'src/types/kaggle';
import * as puppeteer from 'puppeteer';
import { KAGGLE_CONTEST_PAGE } from './urls';

export const generateKaggleJSON = async (): Promise<KaggleItem[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(KAGGLE_CONTEST_PAGE, {
    waitUntil: ['networkidle2'],
  });

  // DEBUG : Use this else console won't work inside evaluate function
  page.on('console', (consoleObj) => console.log(consoleObj.text()));

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

      data.push({
        title,
        description,
        link,
        iconUrl,
        secondaryDescription,
      });
    });

    return data;
  });

  await browser.close();
  return competitionList;
};
