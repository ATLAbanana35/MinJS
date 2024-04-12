export function _import(inputString) {
  const regex = /^Print<+"(.*?)">/;

  const match = inputString.match(regex);
  if (match) {
    const param1 = match[1];

    return { message: param1 };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push("say " + args.message);
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
