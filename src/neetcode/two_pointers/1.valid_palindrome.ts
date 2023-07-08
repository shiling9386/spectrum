function isPalindrome(s: string): boolean {
  let left = 0,
    right = s.length - 1;
  while (left <= right) {
    if (!isAlphaNumeric(s, left)) {
      left++;
      continue;
    }
    if (!isAlphaNumeric(s, right)) {
      right--;
      continue;
    }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      console.log(s[left], s[right]);
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function isAlphaNumeric(str: string, index: number) {
  const code = str.charCodeAt(index);
  if (
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123) //// lower alpha (a-z)
  ) {
    return false;
  }
  return true;
}

isPalindrome("A man, a plan, a canal: Panama");
