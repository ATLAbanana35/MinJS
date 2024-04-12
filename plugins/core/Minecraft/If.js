export function _import(inputString) {
  const regex = /^Minecraft\sIf<+(\w+)>\(+(.*?)\):\s*(\w+)/;
  const match = inputString.match(regex);
  if (match) {
    const type = match[1];
    const expression = match[2];
    const funName = match[3];
    return { type: type, expression: expression, funName: funName };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  const functions = self.loop.objects[0].content;
  functions.forEach((element) => {
    if (element.name === args.funName) {
      commands.push(
        "execute if " +
          args.type +
          " " +
          args.expression +
          " run " +
          element.run
      );
    }
  });
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
