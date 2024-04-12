function ppre(memory, infos) {
  memory[infos.name] = infos.value;
  return memory;
}
export function _import(inputString, memory) {
  const regex = /^Any\sPPvar\s+(\w+)\s+=\s+(.+)/;

  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];
    const value = match[2];

    return [{ name: variableName, value: value }, ppre];
  } else {
    return null;
  }
}
export function _export(inputString) {}
