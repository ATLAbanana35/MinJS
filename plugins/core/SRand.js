export function _import(inputString) {
  const regex = /^(\w+).Random\(+(\d+),+(\d+)\)/;
  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];
    const Min = match[2];
    const Max = match[3];
    return { name: variableName, Min: Min, Max: Max };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(
    memory.data[args.name].random
      .replace("[MIN]", args.Min)
      .replace("[MAX]", args.Max)
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
