export function _import(inputString) {
  const regex = /^Run\s+(\w+)\(\)/;

  const match = inputString.match(regex);
  if (match) {
    const functionName = match[1];

    return { name: functionName };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  const functions = self.loop.objects[0].content;
  functions.forEach((element) => {
    if (element.name === args.name) {
      commands.push(element.run);
    }
  });
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
