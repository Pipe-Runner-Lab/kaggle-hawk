import { expect } from "chai";
import { KaggleContestItem } from "../src/types/basic";
import { kaggleApi } from "../src/utils/kaggle.api";

describe("Kaggle API tests", () => {
  let kaggleList: KaggleContestItem[] = [];

  it("Kaggle contest list response should not be empty", async () => {
    kaggleList = await kaggleApi.getCompetitionList();
    expect(kaggleList).to.be.an("array").to.be.not.empty;
  });

  it("Kaggle leaderboard list response should not be empty", async () => {
    const leaderboard = await kaggleApi.getContestLeaderboard(
      kaggleList[0].ref
    );
    expect(leaderboard).to.be.an("array").to.be.not.empty;
  });
});
