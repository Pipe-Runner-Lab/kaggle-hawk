export function truncate(text: string, limit: number): string {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
}

export function numberShortner(value: number | string): string {
  value = parseInt(value as string, 10);
  if (value >= 1000) {
    return `${Math.ceil(value / 1000)} K`;
  }
  return `${value}`;
}
