export function _import(inputString) {
  const regex = /^Summon<+"(.*?)",+"(.*?)",+"(.*?)">/;

  const match = inputString.match(regex);
  if (match) {
    const param1 = match[1];
    const param2 = match[2];
    const param3 = match[3];

    return { param1: param1, param2: param2, param3: param3 };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(
    "summon " + args.param1 + " " + args.param2 + " " + args.param3
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
