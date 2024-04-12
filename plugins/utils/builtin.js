export function replaceVariables(text, variables) {
  return text.replace(/\{(\w+)\}/g, function (match, variableName) {
    if (variables.hasOwnProperty(variableName)) {
      return variables[variableName];
    } else {
      return match;
    }
  });
}
export function arrayLastIndexOf(array, search) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.indexOf(search) !== -1) {
      return i;
    }
  }
  return -1;
}
export function arrayIndexOf(array, search) {
  const indexOn = -1;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.indexOf(search) !== -1) {
      indexOn = i;
    }
  }
  return indexOn;
}
