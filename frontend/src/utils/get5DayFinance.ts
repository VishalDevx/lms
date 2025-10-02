export function get5DayIntervalData(labels: string[], data: number[]) {
  const intervals = [5, 10, 15, 20, 25, 30];
  const resultData: number[] = [];

  intervals.forEach((day) => {
    // Sum all values up to the current interval
    const sum = data
      .filter((_, i) => Number(labels[i]) <= day)
      .reduce((acc, val) => acc + val, 0);
    resultData.push(sum);
  });

  return { labels: intervals.map(String), data: resultData };
}
