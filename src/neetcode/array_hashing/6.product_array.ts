/**
 *
 * Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 *
 * 1.
 * Input: nums = [1,2,3,4]
 * Output: [24,12,8,6]
 */

function productExceptSelf(nums: number[]): number[] {
  const prefix = Array.from({ length: nums.length }, () => 1);
  const postfix = prefix.slice();
  const result = prefix.slice();
  for (let index = 1; index < nums.length; index++) {
    if (index === 1) {
      prefix[index] = nums[index - 1];
      postfix[nums.length - 2] = nums[nums.length - 1];
    } else {
      prefix[index] = prefix[index - 1] * nums[index - 1];
      postfix[nums.length - 1 - index] = nums[nums.length - index] * postfix[nums.length - index];
    }
  }
  result[0] = postfix[0];
  result[nums.length - 1] = prefix[nums.length - 1];
  for (let index = 1; index < nums.length - 1; index++) {
    result[index] = prefix[index] * postfix[index];
  }
  return result;
}
// [1, 1, 2, 6]
// [24, 12, 4, 1]
productExceptSelf([1, 2, 3, 4]);
