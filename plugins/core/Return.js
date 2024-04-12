export function _import(inputString) {
  const regex = /^Return/;

  const match = inputString.match(regex);
  if (match) {
    return {};
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  commands.push(
    "/kill @e[tag=" + self.prop.tagId + ",type=command_block_minecart]"
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
