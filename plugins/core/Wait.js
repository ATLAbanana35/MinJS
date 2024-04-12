export function _import(inputString) {
  const regex = /^Wait\s+(\d+)/;

  const match = inputString.match(regex);
  if (match) {
    const param1 = match[1];

    return { time: param1 };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push("WAIT_" + args.time);
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
