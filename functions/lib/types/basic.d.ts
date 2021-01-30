export declare type KaggleContestItem = {
    id: number;
    ref: string;
    title: string;
    description: string;
    url: string;
    submissionsDisabled: boolean;
    isKernelsSubmissionsOnly: boolean;
    awardsPoints: boolean;
    evaluationMetric: string;
    maxDailySubmissions: number;
    maxTeamSize: number;
    teamCount: number;
    organizationName: String;
    reward: string;
    category: string;
    deadline: string;
    tags: string[];
    enabledDate: string;
    mergerDeadline: string | null;
};
export declare type KaggleLeaderboardItem = {
    teamId: number;
    teamName: string;
    submissionDate: string;
    score: number;
};
