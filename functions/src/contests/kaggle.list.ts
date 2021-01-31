import { kaggleApi } from "../utils/kaggle.api";
import { kaggleUpdate } from "../utils/kaggle.update";
import { kaggleUtils } from "../utils/kaggle.postprocess";
import { KaggleDiffItem, KaggleLeaderboardItem } from "../types/basic";
import { MAX_ITEMS, push } from "../utils/queue";
// import moment from "moment";

async function refreshContestList(): Promise<void> {
  try {
    /**
     * Fetch contest data
     */
    const kaggleList: any = await kaggleApi.getCompetitionList();
    const postProcessedContestList = kaggleUtils.remap(kaggleList);
    // generate inverted map to help in diff
    let invertedMap: {
      [id: number]: {
        teamCount: number;
      };
    } = {};
    postProcessedContestList.forEach((item, idx) => {
      invertedMap = {
        ...invertedMap,
        [item.id]: {
          teamCount: item.teamCount,
        },
      };
    });

    /**
     * Fetch leaderboard data
     */
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

    /**
     * Generate diff of teamCount and score
     */
    const currentDiffMap = await kaggleUpdate.getDiffsMap();
    let diffMap: { [key: string]: KaggleDiffItem } = {};
    contestKeys.forEach((id: number, idx: number) => {
      // find diff of contest.idx only if leaderboard.idx exists
      if (postProcessedLeaderboardMap[id]?.length > 0) {
        const currentDiff: KaggleDiffItem | undefined = currentDiffMap[id];
        diffMap = {
          ...diffMap,
          [`${id}`]: {
            updateCycle: 12,
            score: currentDiff
              ? push<{ value: number; timestamp: number }>(
                  {
                    value: postProcessedLeaderboardMap[id][0].score,
                    timestamp: Date.now(),
                  },
                  currentDiff.score,
                  MAX_ITEMS
                )
              : [
                  {
                    value: postProcessedLeaderboardMap[id][0].score,
                    timestamp: Date.now(),
                  },
                ],
            teamCount: currentDiff
              ? push<{ value: number; timestamp: number }>(
                  {
                    value: invertedMap[id].teamCount,
                    timestamp: Date.now(),
                  },
                  currentDiff.teamCount,
                  MAX_ITEMS
                )
              : [
                  {
                    value: invertedMap[id].teamCount,
                    timestamp: Date.now(),
                  },
                ],
          },
        };
      }
    });

    // Updating firestore
    await Promise.all([
      kaggleUpdate.updateContestList(postProcessedContestList),
      kaggleUpdate.updateLeaderboardList(postProcessedLeaderboardMap),
      kaggleUpdate.updateDiff(diffMap),
    ]);
    return;
  } catch (error) {
    console.error("Error updating kaggle collection", error);
    return;
  }
}

export const kaggle = {
  refreshContestList,
};
