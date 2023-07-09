/**
 * 
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 */
function isValidSudoku(board: string[][]): boolean {
  if (isViolatingRule1(board)) {
    console.log("rule1 violated");
    return false;
  }
  if (isViolatingRule2(board)) {
    console.log("rule2 violated");
    return false;
  }
  if (isViolatingRule3(board)) {
    console.log("rule3 violated");
    return false;
  }
  return true;
}

const isViolatingRule1 = (board: string[][]): boolean => {
  for (let row = 0; row <= 8; row++) {
    if (!validateNineNumbers(board[row])) {
      return true;
    }
  }
  return false;
};

const isViolatingRule2 = (board: string[][]): boolean => {
  for (let col = 0; col <= 8; col++) {
    const subboard = sliceBoard(board, [0, col], [8, col]);
    if (!validateNineNumbers(subboard)) {
      return true;
    }
  }
  return false;
};

const isViolatingRule3 = (board: string[][]): boolean => {
  for (const subBoard of [
    sliceBoard(board, [0, 0], [2, 2]),
    sliceBoard(board, [0, 3], [2, 5]),
    sliceBoard(board, [0, 6], [2, 8]),
    sliceBoard(board, [3, 0], [5, 2]),
    sliceBoard(board, [3, 3], [5, 5]),
    sliceBoard(board, [3, 6], [5, 8]),
    sliceBoard(board, [6, 0], [8, 2]),
    sliceBoard(board, [6, 3], [8, 5]),
    sliceBoard(board, [6, 6], [8, 8]),
  ]) {
    if (!validateNineNumbers(subBoard)) {
      console.log("Bad Boaard", subBoard);
      return true;
    }
  }
  return false;
};

const sliceBoard = (
  board: string[][],
  [i, j]: [i: number, j: number],
  [x, y]: [x: number, y: number]
): string[] => {
  const result: string[] = [];
  for (let row = i; row <= x; row++) {
    for (let col = j; col <= y; col++) {
      result.push(board[row][col]);
    }
  }
  return result;
};

const validateNineNumbers = (array: string[]): boolean => {
  const set: Set<string> = new Set();
  for (let item of array) {
    if (item === ".") {
      continue;
    }
    if (set.has(item)) {
      return false;
    }
    set.add(item);
  }
  return true;
};

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
const board2 = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const board3 = [
  [".", ".", "5", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", ".", "1", "4", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", "9", "2", ".", "."],
  ["5", ".", ".", ".", ".", "2", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "3", "."],
  [".", ".", ".", "5", "4", ".", ".", ".", "."],
  ["3", ".", ".", ".", ".", ".", "4", "2", "."],
  [".", ".", ".", "2", "7", ".", "6", ".", "."],
];

console.log(isValidSudoku(board3));
