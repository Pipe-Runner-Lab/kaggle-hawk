export type RawContestList = {
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

export type SanitizedList = {
  category: string;
  deadline: string;
  description: string;
  evaluationMetric: string;
  id: number;
  maxDailySubmissions: number;
  maxTeamSize: number;
  reference: string;
  reward: string;
  tags: string[];
  teamCount: number;
  title: string;
  url: string;
  enabledDate: string;
  mergerDeadline: string;
  finishedFraction: number;
  isWatched: boolean
};

export type RawLeaderboardObject = {
  [key: string]: object;
};
