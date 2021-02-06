import { KaggleContestItem, KaggleDiffItem, KaggleLeaderboardItem } from "../types/basic";
declare function updateContestList(contestMap: Record<string, KaggleContestItem>): Promise<any>;
declare function updateLeaderboardList(leaderboardMap: Record<string, KaggleLeaderboardItem[]>): Promise<any>;
declare function getDiffsMap(): Promise<Record<string, KaggleDiffItem> | void>;
declare function updateDiff(diffMap: Record<string, KaggleDiffItem>): Promise<any>;
export declare const kaggleUpdate: {
    updateContestList: typeof updateContestList;
    updateLeaderboardList: typeof updateLeaderboardList;
    getDiffsMap: typeof getDiffsMap;
    updateDiff: typeof updateDiff;
};
export {};
