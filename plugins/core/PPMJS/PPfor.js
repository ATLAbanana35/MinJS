export function _import(inputString, memory, self) {
  const regex = /^PPfor\s+(\d+)\s+(\w+)\(\)/;

  const match = inputString.match(regex);
  if (match) {
    const repeatNumber = match[1];
    const functionName = match[2];

    return { repeat: repeatNumber, name: functionName };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  for (let i = 0; i < args.repeat; i++) {
    const functions = self.loop.objects[0].content;
    functions.forEach((element) => {
      if (element.name === args.name) {
        const newCommands = [];
        element.command_s.forEach((currCom) => {
          newCommands.push(currCom.replace("$i", i));
        });
        const result1 = utils.minFun(newCommands, usedBlocks, []);
        usedBlocks = result1[0];
        self.commands.push(...result1[1]);
        commands.push(result1[2]);
      }
    });
  }
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
