import { KaggleContestItem } from "../types/basic";

export function kaggleRemap(list: any): KaggleContestItem[] {
  return list.map((item) => ({
    id: item.id,
    ref: item.ref,
    title: item.title,
    description: item.description,
    url: item.url,
    submissionsDisabled: item.submissionsDisabled,
    isKernelsSubmissionsOnly: item.isKernelsSubmissionsOnly,
    awardsPoints: item.awardsPoints,
    evaluationMetric: item.evaluationMetric,
    maxDailySubmissions: item.maxDailySubmissions,
    maxTeamSize: item.maxTeamSize,
    teamCount: item.teamCount,
    organizationName: item.organizationName,
    reward: item.reward,
    category: item.category,
    deadline: item.deadline,
    tags: item.tags.map((tag) => tag.name),
  }));
}
