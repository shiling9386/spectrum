function topKFrequent(nums: number[], k: number): number[] {
  const numMap: Record<number, number> = {};
  for (const num of nums) {
    numMap[num] = numMap[num] === undefined ? 1 : numMap[num] + 1;
  }
  console.log("numMap", numMap);
  const sorted = Object.keys(numMap)
    .map(Number)
    .sort((a, b) => numMap[b] - numMap[a]);
  console.log("sorted", sorted);
  return sorted.slice(0, k);
}

topKFrequent([1, 1, 1, 2, 2, 2, 2, 3], 2);
