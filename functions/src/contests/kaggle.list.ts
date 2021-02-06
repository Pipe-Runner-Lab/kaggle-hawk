import { kaggleApi } from "../utils/kaggle.api";
import { kaggleUpdate } from "../utils/kaggle.update";
import { kaggleUtils } from "../utils/kaggle.postprocess";
import {
  KaggleContestItem,
  KaggleDiffItem,
  KaggleLeaderboardItem,
} from "../types/basic";
import { MAX_ITEMS, push } from "../utils/queue";
// import moment from "moment";

async function refreshContestList(): Promise<void> {
  try {
    /**
     * Fetch contest data
     */
    const kaggleList: any = await kaggleApi.getCompetitionList();
    const postProcessedContestList = kaggleUtils.remap(kaggleList);
    // generate contest map
    let contestMap: Record<number, KaggleContestItem> = {};
    postProcessedContestList.forEach((item, idx) => {
      contestMap = {
        ...contestMap,
        [item.id]: item,
      };
    });

    /**
     * Fetch leaderboard data
     */
    const contestKeys = postProcessedContestList.map((contest) => contest.id);
    const promiseList = postProcessedContestList.map((contest) => {
      return kaggleApi.getContestLeaderboard(contest.ref);
    });
    const resultList = await Promise.all([...promiseList]);
    let leaderboardMap: Record<string, KaggleLeaderboardItem[]> = {};
    contestKeys.forEach((id: number, idx: number) => {
      leaderboardMap = {
        ...leaderboardMap,
        [`${id}`]: resultList[idx],
      };
    });

    /**
     * Generate diff of teamCount and score
     */
    const currentDiffMap = await kaggleUpdate.getDiffsMap();
    let diffMap: Record<string, KaggleDiffItem> = {};
    contestKeys.forEach((id: number, idx: number) => {
      // find diff of contest.idx only if leaderboard.idx exists
      if (leaderboardMap[id]?.length > 0) {
        const currentDiff: KaggleDiffItem | undefined = currentDiffMap[id];
        diffMap = {
          ...diffMap,
          [`${id}`]: {
            updateCycle: 12,
            score: currentDiff
              ? push<{ value: number; timestamp: number }>(
                  {
                    value: leaderboardMap[id][0].score,
                    timestamp: Date.now(),
                  },
                  currentDiff.score,
                  MAX_ITEMS
                )
              : [
                  {
                    value: leaderboardMap[id][0].score,
                    timestamp: Date.now(),
                  },
                ],
            teamCount: currentDiff
              ? push<{ value: number; timestamp: number }>(
                  {
                    value: contestMap[id].teamCount,
                    timestamp: Date.now(),
                  },
                  currentDiff.teamCount,
                  MAX_ITEMS
                )
              : [
                  {
                    value: contestMap[id].teamCount,
                    timestamp: Date.now(),
                  },
                ],
          },
        };
      }
    });

    // Updating firestore
    await Promise.all([
      kaggleUpdate.updateContestList(contestMap),
      kaggleUpdate.updateLeaderboardList(leaderboardMap),
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
