/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 */

function groupAnagrams(strs: string[]): string[][] {
  const anagramMapList: {
    characterMap: CharacterMap;
    children: string[];
  }[] = [];

  for (const str of strs) {
    // check is the characterMap of current str found in anagramMapList
    const currentCharacterMap = getCharacterMap(str);
    const matchIndex = anagramMapList.findIndex((anagramMap) =>
      checkIsCharMapSame(anagramMap.characterMap, currentCharacterMap)
    );
    // if found, add str to children
    if (matchIndex >= 0) {
      anagramMapList[matchIndex].children.push(str);
      continue;
    }
    // otherwise, insert a new item into anagramMapList with str in the children
    anagramMapList.push({
      characterMap: currentCharacterMap,
      children: [str],
    });
  }
  const result = anagramMapList.map((anagramMap) => anagramMap.children);
  return result;
}

const checkIsCharMapSame = (charMap1: CharacterMap, charMap2: CharacterMap): boolean => {
  const keys1 = Object.keys(charMap1);
  const keys2 = Object.keys(charMap2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (charMap1[key] !== charMap2[key]) {
      return false;
    }
  }
  return true;
};

interface CharacterMap {
  [char: string]: number;
}
const getCharacterMap = (str: string): CharacterMap => {
  const result: CharacterMap = {};
  for (const char of str) {
    result[char] = result[char] === undefined ? 1 : result[char] + 1;
  }
  return result;
};

/* -------------------------------------------------------------------------- */
/*                              Another solution                              */
/* -------------------------------------------------------------------------- */

function groupAnagrams2(strs: string[]): string[][] {
  let map = new Map<string, string[]>();
  for (let s of strs) {
    let charFreq = Array.from({ length: 26 }, () => 0);
    for (let i = 0; i < s.length; i++) {
      charFreq[s.charCodeAt(i) - 97]++;
    }
    let keyStr = charFreq.toString();
    if (!map.has(keyStr)) map.set(keyStr, []);
    map.get(keyStr)?.push(s);
  }
  return Array.from(map.values());
}

console.log("abcd".charCodeAt(2));
