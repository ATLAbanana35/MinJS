export function _import(inputString) {
  const regex = /^(\w+).Remove\(\)/;
  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];
    return { name: variableName };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(memory.data[args.name].remove);
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
