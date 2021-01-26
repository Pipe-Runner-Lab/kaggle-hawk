import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "https://www.kaggle.com/api/v1";

const headers = {
  Authorization:
    "Basic aHVtYmxlZGlzY2lwdWx1czphNjJlMmU2MmViZjMwZDE0ZTIzZTRlM2I1YWJlYzY4Ng==",
  Cookie: "ka_sessionid=249b1314ba23d178b94c59d4a5a9e712; GCLB=CJHmxoeQm97iUg",
};

/**
 * Get competition list
 */
export async function getCompetitionList() {
  try {
    const config: Partial<AxiosRequestConfig> = {
      method: "get",
      url: `${baseUrl}/competitions/list?category=all&sortBy=latestDeadline`,
      headers,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching competition list from Kaggle");
    return [];
  }
}
