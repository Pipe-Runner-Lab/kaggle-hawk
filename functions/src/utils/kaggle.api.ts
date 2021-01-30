import axios, { AxiosRequestConfig } from "axios";
import { KaggleContestItem, KaggleLeaderboardItem } from "../types/basic";

const baseUrl = "https://www.kaggle.com/api/v1";

const headers = {
  Authorization:
    "Basic aHVtYmxlZGlzY2lwdWx1czphNjJlMmU2MmViZjMwZDE0ZTIzZTRlM2I1YWJlYzY4Ng==",
  Cookie: "ka_sessionid=249b1314ba23d178b94c59d4a5a9e712; GCLB=CJHmxoeQm97iUg",
};

/**
 * Get competition list
 */
async function getCompetitionList(): Promise<KaggleContestItem[]> {
  try {
    const config: Partial<AxiosRequestConfig> = {
      method: "get",
      url: `${baseUrl}/competitions/list?category=all&sortBy=latestDeadline`,
      headers,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching competition list from Kaggle", error);
    return [];
  }
}

/**
 * Get contest leaderboard list
 */
async function getContestLeaderboard(
  ref: string
): Promise<KaggleLeaderboardItem[]> {
  try {
    const config: Partial<AxiosRequestConfig> = {
      method: "get",
      url: `${baseUrl}/competitions/${ref}/leaderboard/view`,
      headers,
    };

    const response = await axios(config);
    return response.data.submissions;
  } catch (error) {
    console.error("Error fetching contest leaderboard from Kaggle", error);
    return [];
  }
}

export const kaggleApi = {
  getCompetitionList,
  getContestLeaderboard,
};
