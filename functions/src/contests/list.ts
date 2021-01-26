import { getCompetitionList } from "../utils/kaggle.api";
import { kaggleRemap } from "../utils/kaggle.postprocess";
import { updateKaggleDoc } from "../utils/kaggle.update";

export async function refreshContestList(): Promise<any> {
  try {
    // Fetching data
    const kaggleList: any = await getCompetitionList();
    const postProcessed = kaggleRemap(kaggleList);

    // Updating firestore
    return Promise.all([updateKaggleDoc(postProcessed)]);
  } catch (error) {
    console.error("Error updating contest list", error);
  }
}
