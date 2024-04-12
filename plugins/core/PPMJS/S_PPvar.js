import { String } from "../../types/tps.mjs";
function ppre(memory, infos) {
  memory[infos.name] = infos.value;
  return memory;
}
export function _import(inputString, memory) {
  const regex = /^String\sPPvar\s+(\w+)\s+=\s+('[^']*'|"[^"]*")/;

  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];
    const string = new String(match[2]);
    const value = string.content;

    return [{ name: variableName, value: value }, ppre];
  } else {
    return null;
  }
}
export function _export(inputString) {}
