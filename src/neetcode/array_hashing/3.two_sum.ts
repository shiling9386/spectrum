/**
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 */

function twoSum(nums: number[], target: number): number[] {
  const map: { [num: number]: number } = {};
  for (let index = 0; index < nums.length; index++) {
    if (map[target - nums[index]] !== undefined) {
      return [index, map[target - nums[index]]];
    }
    map[nums[index]] = index;
  }
  return [0, 1];
}
// console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([6, 5, 7, 8, 9, 3], 10));
