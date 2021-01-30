import { kaggleApi } from "../utils/kaggle.api";
import { kaggleUpdate } from "../utils/kaggle.update";
import { kaggleUtils } from "../utils/kaggle.postprocess";
import { KaggleLeaderboardItem } from "../types/basic";

async function refreshContestList(): Promise<void> {
  try {
    // Fetching contest data
    const kaggleList: any = await kaggleApi.getCompetitionList();
    const postProcessedContestList = kaggleUtils.remap(kaggleList);

    // Fetching leaderboard data
    const filteredList = postProcessedContestList.filter(
      (contest) => contest.category !== "Getting Started"
    );
    const contestKeys = filteredList.map((contest) => contest.id);
    const promiseList = filteredList.map((contest) => {
      return kaggleApi.getContestLeaderboard(contest.ref);
    });
    const resultList = await Promise.all([...promiseList]);
    let postProcessedLeaderboardMap: {
      [id: string]: KaggleLeaderboardItem[];
    } = {};
    contestKeys.forEach((id: number, idx: number) => {
      postProcessedLeaderboardMap = {
        ...postProcessedLeaderboardMap,
        [`${id}`]: resultList[idx],
      };
    });

    // Updating firestore
    await Promise.all([
      kaggleUpdate.updateContestList(postProcessedContestList),
      kaggleUpdate.updateLeaderboardList(postProcessedLeaderboardMap),
    ]);
    return;
  } catch (error) {
    console.error("Error updating contest list", error);
    return;
  }
}

export const kaggle = {
  refreshContestList,
};
