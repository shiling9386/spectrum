/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 */

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }
  let charMap = getCharMap(s);
  for (let char of t) {
    if (charMap[char] === undefined || charMap[char] === 0) {
      return false;
    }
    charMap[char] -= 1;
  }
  return true;
}

const getCharMap = (s: string): Record<string, number> => {
  const result: Record<string, number> = {};
  for (let char of s) {
    result[char] = result[char] ? result[char] + 1 : 1;
  }
  return result;
};

// console.log(getCharMap("anagram"));
isAnagram("anagram", "nagaram");
