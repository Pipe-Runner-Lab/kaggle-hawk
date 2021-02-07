import { SanitizedContestType } from "../types/kaggle";

export function sortByTimeLeft(
  itemL: SanitizedContestType,
  itemR: SanitizedContestType
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
  itemL: SanitizedContestType,
  itemR: SanitizedContestType
): number {
  if (itemL.finishedFraction < itemR.finishedFraction) {
    return 1;
  } else if (itemL.finishedFraction > itemR.finishedFraction) {
    return -1;
  } else {
    return 0;
  }
}
