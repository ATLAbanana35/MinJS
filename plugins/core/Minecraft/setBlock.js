export function _import(inputString) {
  const regex = /^setBlock<+(.*?),+(.*?),+(.*?),+"(.*?)">/;

  const match = inputString.match(regex);
  if (match) {
    const param1 = match[1];
    const param2 = match[2];
    const param3 = match[3];
    const param4 = match[4];

    return { x: param1, y: param2, z: param3, type: param4 };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(
    "setblock " +
      args.x +
      " " +
      args.y +
      " " +
      args.z +
      " " +
      args.type +
      " replace"
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
