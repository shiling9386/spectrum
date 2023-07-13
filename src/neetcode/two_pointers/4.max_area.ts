/**
 *
 * @param height
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 * Return the maximum amount of water a container can store.
 */
function maxArea(heights: number[]): number {
  let maxArea = 0;
  for (let left = 0; left < heights.length - 1; left++) {
    if (heights[left] === 0) {
      continue;
    }
    let right = heights.length - 1;
    while (heights[right] < heights[left]) {
      right--;
    }
    const area = (right - left) * heights[left];
    maxArea = Math.max(area, maxArea);
  }

  for (let right = heights.length - 1; right > 0; right--) {
    if (heights[right] === 0) {
      continue;
    }
    let left = 0;
    while (heights[left] < heights[right]) {
      left++;
    }
    const area = (right - left) * heights[right];
    maxArea = Math.max(area, maxArea);
  }
  return maxArea;
}

maxArea([2, 3, 10, 5, 7, 8, 9]);
