import { KaggleContestItem } from "../types/basic";
export declare function updateContestList(): Promise<{
    kaggle: KaggleContestItem[];
}>;
export declare function updateContestList_fs(list: {
    kaggle: KaggleContestItem[];
}): Promise<any>;
