export function _import(inputString) {
  const regex = /^(\w+).Add\(\)/;
  const match = inputString.match(regex);

  if (match) {
    const variableName = match[1];
    return { name: variableName };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(memory.data[args.name].add);
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
