export function push<T>(item: T, list: T[], maxLength: number): T[] {
  let result: T[];

  if (list.length < maxLength) {
    result = [...list, item];
  }else{
    result = [...list.splice(1, list.length), item];
  }
  return result;
}

export const MAX_ITEMS = 60;
