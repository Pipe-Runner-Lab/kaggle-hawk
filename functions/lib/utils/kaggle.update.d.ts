import { KaggleContestItem, KaggleDiffItem, KaggleLeaderboardItem } from "../types/basic";
declare function updateContestList(list: KaggleContestItem[]): Promise<any>;
declare function updateLeaderboardList(contests: {
    [key: string]: KaggleLeaderboardItem[];
}): Promise<any>;
declare function getDiffsMap(): Promise<{
    [key: string]: KaggleDiffItem;
} | void>;
declare function updateDiff(diff: {
    [id: string]: KaggleDiffItem;
}): Promise<any>;
export declare const kaggleUpdate: {
    updateContestList: typeof updateContestList;
    updateLeaderboardList: typeof updateLeaderboardList;
    getDiffsMap: typeof getDiffsMap;
    updateDiff: typeof updateDiff;
};
export {};
