const ReplacementCombination:{[key: string]: string} = {
  '%': '%25',
  '$': '%24',
  '&': '%26',
  '+': '%2b',
  ',': '%2c',
  '/': '%2f',
  ':': '%3a',
  ';': '%3b',
  '=': '%3d',
  '?': '%3f',
  '@': '%40',
  ' ': '%20', // space

  '"': '%22',
  '<': '%3c',
  '>': '%3e',
  '#': '%23',
  '{': '%7b',
  '}': '%7d',
  '|': '%7c',
  '\\': '%5c',
  '^': '%5e',
  '~': '%7e',
  '[': '%5b',
  ']': '%5d',
  '`': '%60'
};

export const replaceSpecChar = (val:string) => {
  let resultString = val;
  for (const key in ReplacementCombination) {
    let newString = resultString.replace(key, ReplacementCombination[key]);
    resultString = newString;
  }
  return resultString;
};
