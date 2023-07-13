/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 */
function threeSum(nums: number[]): number[][] {
  const results: number[][] = [];
  const sortedNums = nums.slice().sort((a, b) => a - b);
  for (let index = 0; index < sortedNums.length - 2; index++) {
    if (index > 0 && sortedNums[index] === sortedNums[index - 1]) {
      continue;
    }
    const currentNum = sortedNums[index];
    const target = -currentNum;
    let left = index + 1;
    let right = sortedNums.length - 1;
    while (left < right) {
      const sum = sortedNums[left] + sortedNums[right];
      if (sum === target) {
        results.push([currentNum, sortedNums[left], sortedNums[right]]);
        left++;
        right--;
        while (sortedNums[right] === sortedNums[right + 1]) {
          right--;
        }
        while (sortedNums[left] === sortedNums[left - 1]) {
          left++;
        }
      } else if (sum > target) {
        right--;
      } else {
        left++;
      }
    }
  }
  return results;
}

console.log(threeSum([-2, 0, 0, 2, 2]));
// console.log(threeSum([3, 0, -2, -1, 1, 2]));
// [-2, -1, 0, 1, 2, 3];
// [-1, -2, 0, 1, 2, 3];
// [0, -2, -1, 1, 2, 3];
// [1, -2, -1, 0, 2, 3];
// [2, -2, -1, 0, 1, 3];
// [2, -2, -1, 0, 1, 3];
