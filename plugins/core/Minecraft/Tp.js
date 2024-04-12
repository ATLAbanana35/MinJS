export function _import(inputString) {
  const regex = /^Tp<+"(.*?)",+"(.*?)">/;

  const match = inputString.match(regex);
  if (match) {
    const pseudo = match[1];
    const ou = match[2];

    return { pseudo: pseudo, ou: ou };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push("tp " + args.pseudo + " " + args.ou);
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
