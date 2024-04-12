export function _import(inputString) {
  const regex = /^If<Bvar>\((\w+|\d+)\s*(=|>|<)\s*(\w+|\d+)\):\s*(\w+)/;
  const match = inputString.match(regex);
  if (match) {
    const firstVal = match[1];
    const Sign = match[2];
    const secVal = match[3];
    const funName = match[4];
    return { firstVal: firstVal, Sign: Sign, secVal: secVal, funName: funName };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  const com_to_run = [];
  const functions = self.loop.objects[0].content;
  if (isNaN(parseInt(args.firstVal))) {
    if (isNaN(parseInt(args.secVal))) {
    } else {
      const functions = self.loop.objects[0].content;
      functions.forEach((element) => {
        if (element.name === args.funName) {
          usedBlocks += 2;
          const command1 = memory.data[args.firstVal].get(
            args.secVal,
            element.run,
            args.Sign
          );
          commands.push(command1);
        }
      });
      return { commands: commands, memory: memory, usedBlocks: usedBlocks };
    }
  } else {
    if (isNaN(parseInt(args.secVal))) {
    } else {
      const functions = self.loop.objects[0].content;
      functions.forEach((element) => {
        if (element.name === args.funName) {
          const command1 = eval(args.firstVal + args.Sign + args.secVal);
          if (command1) {
            commands.push(element.run);
          }
        }
      });
      return { commands: commands, memory: memory, usedBlocks: usedBlocks };
    }
  }
}
