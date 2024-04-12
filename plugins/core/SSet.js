export function _import(inputString) {
  const regex = /^(\w+).Set\(+(\d+)\)/;
  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];
    const value = match[2];
    return { name: variableName, value: value };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(memory.data[args.name].set(args.value));
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
