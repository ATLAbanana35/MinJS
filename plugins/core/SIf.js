export function _import(inputString) {
  const regex = /^If<Svar>\((\w+|\d+)\s*(=|>|<)\s*(\w+|\d+)\):\s*(\w+)/;
  const match = inputString.match(regex);
  if (match) {
    const firstVal = match[1];
    const Sign = match[2];
    const secVal = match[3];
    const funName = match[4];
    return { firstVal: firstVal, Sign: Sign, secVal: secVal, funName: funName };
  } else {
    const regex =
      /^If<Svar\s(.*?)>\((\w+|\d+)\s*(=|>|<)\s*(\w+|\d+)\):\s*(\w+)/;
    const match = inputString.match(regex);
    if (match) {
      const selector = match[1];
      const firstVal = match[2];
      const Sign = match[3];
      const secVal = match[4];
      const funName = match[5];
      return {
        selector: selector,
        firstVal: firstVal,
        Sign: Sign,
        secVal: secVal,
        funName: funName,
      };
    } else {
      return null;
    }
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  const functions = self.loop.objects[0].content;
  if (isNaN(parseInt(args.firstVal))) {
    if (isNaN(parseInt(args.secVal))) {
      const functions = self.loop.objects[0].content;
      functions.forEach((element) => {
        if (element.name === args.funName) {
          const command1 = memory.data[args.firstVal].get(
            args.secVal,
            element.run,
            args.Sign,
            args.secVal,
            args.selector
          );
          commands.push(command1);
        }
      });
      return { commands: commands, memory: memory, usedBlocks: usedBlocks };
    } else {
      const functions = self.loop.objects[0].content;
      functions.forEach((element) => {
        if (element.name === args.funName) {
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
