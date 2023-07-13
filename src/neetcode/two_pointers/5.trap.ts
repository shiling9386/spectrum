function trap(heights: number[]): number {
  const finalShape = heights.slice();
  let left = heights.findIndex((x) => x > 0);
  let right = heights.findLastIndex((x) => x > 0);

  while (left < right) {
    console.log(left, right);
    console.log(finalShape);
    if (finalShape[left] <= finalShape[right]) {
      while (finalShape[left + 1] <= finalShape[left] && left < right) {
        finalShape[left + 1] = finalShape[left];
        left++;
      }
      left++;
    } else {
      while (finalShape[right - 1] <= finalShape[right] && left < right) {
        finalShape[right - 1] = finalShape[right];
        right--;
      }
      right--;
    }
  }
  console.log("finalShape", finalShape);
  const trappedWater = finalShape.reduce((pre, cur, index) => {
    return pre + (cur - heights[index]);
  }, 0);
  return trappedWater;
}

// const blocks = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
trap([5, 5, 1, 7, 1, 1, 5, 2, 7, 6]);
