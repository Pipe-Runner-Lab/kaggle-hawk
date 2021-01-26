import { expect } from "chai";
import { getCompetitionList } from "../src/utils/kaggle.api";

describe("Scrapper tests...", () => {
  it("Kaggle response should not be empty", async () => {
    const kaggleList = await getCompetitionList();
    expect(kaggleList).to.be.an("array").to.be.not.empty;
  })
});
