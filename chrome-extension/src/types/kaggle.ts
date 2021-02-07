export type ContestType = {
  awardsPoints: boolean;
  category: string;
  deadline: string;
  description: string;
  evaluationMetric: string;
  id: number;
  isKernelsSubmissionsOnly: boolean;
  maxDailySubmissions: 5;
  maxTeamSize: 5;
  organizationName: string;
  ref: string;
  reward: string;
  submissionsDisabled: boolean;
  tags: string[];
  teamCount: number;
  title: string;
  url: string;
  enabledDate: string;
  mergerDeadline: string | null;
};

export type ContestMapType = Record<string, ContestType>;

export type SanitizedContestType = {
  awardsPoints: boolean;
  category: string;
  deadline: string;
  description: string;
  evaluationMetric: string;
  id: number;
  isKernelsSubmissionsOnly: boolean;
  maxDailySubmissions: 5;
  maxTeamSize: 5;
  organizationName: string;
  reference: string;
  reward: string;
  submissionsDisabled: boolean;
  tags: string[];
  teamCount: number;
  title: string;
  url: string;
  enabledDate: string;
  mergerDeadline: string | null;
  finishedFraction: number;
  isWatched: boolean;
};

export type SanitizedContestMapType = Record<string, SanitizedContestType>;

export type LeaderboardType = {
  teamId: number;
  teamName: string;
  submissionDate: string;
  score: string;
};

export type LeaderboardMapType = Record<string, LeaderboardType[]>;
