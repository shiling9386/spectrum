function isValid(s: string): boolean {
  const bracketsMap: Map<string, string> = new Map();
  bracketsMap.set("(", ")");
  bracketsMap.set("[", "]");
  bracketsMap.set("{", "}");
  const openBrackets: string[] = [];
  for (let char of s) {
    if (bracketsMap.has(char)) {
      openBrackets.push(char);
    } else {
      const lastOpenBracket = openBrackets.pop();
      if (lastOpenBracket === undefined || char !== bracketsMap.get(lastOpenBracket)) {
        return false;
      }
    }
  }
  return openBrackets.length === 0;
}

console.log(isValid("()[]{}["));
