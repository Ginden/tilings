/** Local calendar date as YYYYMMDD, suitable for the daily default seed. */
export function currentDaySeed(date = new Date()): number {
  return date.getFullYear() * 10_000 + (date.getMonth() + 1) * 100 + date.getDate();
}
