export function _import(inputString) {
  const regex = /^EvFun<+(.*?),+(.*?)>/;

  const match = inputString.match(regex);
  if (match) {
    const selector = match[1];
    const obj_name = match[2];

    return { selector: selector, obj_name: obj_name };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push(
    "S_execute as " +
      args.selector +
      " run scoreboard players set @s " +
      args.obj_name +
      " 0"
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
