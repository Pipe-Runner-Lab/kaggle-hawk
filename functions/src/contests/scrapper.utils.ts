import { KAGGLE_CONTEST_PAGE } from "./urls";
import { KaggleContestItem } from "../types/basic";

export async function kaggleScrapper(page: any): Promise<KaggleContestItem[]> {
  await page.goto(KAGGLE_CONTEST_PAGE, {
    waitUntil: ["networkidle2"],
  });

  return page.evaluate((): KaggleContestItem[] => {
    const listItems = document.querySelectorAll(
      "div.sc-pkryX.tCtqx li.mdc-list-item"
    );
    const data: KaggleContestItem[] = [];
    listItems.forEach((item) => {
      const title = item.querySelector(".mdc-list-item__primary-text")
        .textContent;
      const description = item.querySelector(".hMdDCJ").textContent;
      const link = item.querySelector("a").href;
      const iconUrl = item.querySelector("img").src;
      const secondaryDescription = item.querySelector(".jTyItw").textContent;

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
}
