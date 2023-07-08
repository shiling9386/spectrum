/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 * You must write an algorithm that runs in O(n) time.
 */

function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  const checkedNum: Set<number> = new Set();
  const openEnds: Map<string, number> = new Map();
  for (const num of nums) {
    if (checkedNum.has(num)) {
      continue;
    }
    checkedNum.add(num);
    console.log("checking number", num);
    const startTag = `${num}_START`;
    const endTag = `${num}_END`;

    if (openEnds.has(startTag) && openEnds.has(endTag)) {
      console.log(new Set(openEnds), num);
      const count1 = openEnds.get(endTag)!;
      const count2 = openEnds.get(startTag)!;
      const mergedCount = count1 + count2 + 1;
      openEnds.delete(startTag);
      openEnds.delete(endTag);
      openEnds.set(`${num + 1 + count2}_END`, mergedCount);
      openEnds.set(`${num - 1 - count1}_START`, mergedCount);
      console.log(new Set(openEnds), num);
      continue;
    }
    if (openEnds.has(startTag) || openEnds.has(endTag)) {
      const isPrefix = openEnds.has(startTag);
      const currentTag = isPrefix ? startTag : endTag;
      let count = openEnds.get(currentTag)!;
      const theOtherTag = isPrefix ? `${num + 1 + count}_END` : `${num - 1 - count}_START`;
      console.log("theOtherTag", theOtherTag);
      openEnds.delete(currentTag);
      openEnds.set(getNumTag(num, isPrefix), count + 1);
      openEnds.set(theOtherTag, count + 1);
      console.log(new Set(openEnds), num);
      continue;
    }
    openEnds.set(getNumTag(num, true), 1);
    openEnds.set(getNumTag(num, false), 1);
    console.log(new Set(openEnds), num);
  }
  let max = 1;
  for (const count of openEnds.values()) {
    max = Math.max(count, max);
  }
  return max;
}

const getNumTag = (num: number, isPrefix: boolean): string => {
  const postfix = isPrefix ? "START" : "END";
  const key = isPrefix ? num - 1 : num + 1;
  return `${key}_${postfix}`;
};

// longestConsecutive([100, 4, 200, 1, 3, 2]);
console.log(longestConsecutive([-7, -1, 3, -9, -4, 7, -3, 2, 4, 9, 4, -9, 8, -7, 5, -1, -7]));
