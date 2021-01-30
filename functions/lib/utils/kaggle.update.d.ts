import { KaggleContestItem, KaggleLeaderboardItem } from "../types/basic";
declare function updateContestList(list: KaggleContestItem[]): Promise<any>;
declare function updateLeaderboardList(contests: {
    [key: string]: KaggleLeaderboardItem[];
}): Promise<any>;
export declare const kaggleUpdate: {
    updateContestList: typeof updateContestList;
    updateLeaderboardList: typeof updateLeaderboardList;
};
export {};
