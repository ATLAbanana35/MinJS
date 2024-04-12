export function _import(inputString) {
  const regex = /^Clear<+"(.*?)",+"(.*?)",+(\d+)>/;

  const match = inputString.match(regex);
  if (match) {
    const pseudo = match[1];
    const item = match[2];
    const count = match[3];

    return { pseudo: pseudo, item: item, count: count };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(
    "clear " + args.pseudo + " " + args.item + " " + args.count + ""
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
