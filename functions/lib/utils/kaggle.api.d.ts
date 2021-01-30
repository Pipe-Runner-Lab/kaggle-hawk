import { KaggleContestItem, KaggleLeaderboardItem } from "../types/basic";
declare function getCompetitionList(): Promise<KaggleContestItem[]>;
declare function getContestLeaderboard(ref: string): Promise<KaggleLeaderboardItem[]>;
export declare const kaggleApi: {
    getCompetitionList: typeof getCompetitionList;
    getContestLeaderboard: typeof getContestLeaderboard;
};
export {};
