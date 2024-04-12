export function _import(inputString) {
  const regex = /^At<+"(.*?)">/;

  const match = inputString.match(regex);
  if (match) {
    const param1 = match[1];

    return { param1: param1 };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push("AT_" + args.param1);
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
