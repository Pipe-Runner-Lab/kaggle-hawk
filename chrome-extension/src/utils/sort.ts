import { SanitizedList } from "../types/kaggle";

export function sortByTimeLeft(
  itemL: SanitizedList,
  itemR: SanitizedList
): number {
  if (itemL.finishedFraction < itemR.finishedFraction) {
    return -1;
  } else if (itemL.finishedFraction > itemR.finishedFraction) {
    return 1;
  } else {
    return 0;
  }
}

export function sortByTimeLeftOp(
  itemL: SanitizedList,
  itemR: SanitizedList
): number {
  if (itemL.finishedFraction < itemR.finishedFraction) {
    return 1;
  } else if (itemL.finishedFraction > itemR.finishedFraction) {
    return -1;
  } else {
    return 0;
  }
}
