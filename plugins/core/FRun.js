export function _import(inputString) {
  const regex = /^FastRun\s+(\w+)\(\)/;

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
      usedBlocks += 2;
      const sauvegardeOfUsedBlocks = parseInt(usedBlocks);
      usedBlocks += element.command_s.length + 1;

      self.commands.push(
        "setblock " +
          (utils.data.x + sauvegardeOfUsedBlocks + 1) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          ' command_block[facing=east]{Command:"setblock ~-1 ~ ~ air"} replace'
      );
      commands.push(
        "setblock " +
          (utils.data.x + sauvegardeOfUsedBlocks) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " redstone_block replace"
      );
      let isAs = false;
      let isAt = false;
      let As = "";
      let At = "";
      for (let index = 0; index < element.command_s.length; index++) {
        let inst = element.command_s[index];
        if (inst.startsWith("WAIT_")) {
        } else if (inst.startsWith("AS_")) {
          As = inst.split("AS_")[1];
          isAs = true;
          self.commands.push(
            "/setblock " +
              (utils.data.x + sauvegardeOfUsedBlocks + 2 + index) +
              " " +
              utils.data.y +
              " " +
              utils.data.z +
              " chain_command_block[facing=east]{auto:1b} replace"
          );
        } else if (inst.startsWith("AT_")) {
          At = inst.split("AT_")[1];
          isAt = true;
          self.commands.push(
            "/setblock " +
              (utils.data.x + sauvegardeOfUsedBlocks + 2 + index) +
              " " +
              utils.data.y +
              " " +
              utils.data.z +
              " chain_command_block[facing=east]{auto:1b} replace"
          );
        } else {
          if (isAs) {
            inst = "execute as " + As + " run " + inst;
            isAs = false;
          }
          if (isAt) {
            inst = "execute at " + At + " run " + inst;
            isAt = false;
          }
          self.commands.push(
            "setblock " +
              (utils.data.x + sauvegardeOfUsedBlocks + 2 + index) +
              " " +
              utils.data.y +
              " " +
              utils.data.z +
              " chain_command_block[facing=east]{auto:1b,Command:" +
              JSON.stringify(inst) +
              "} replace"
          );
        }
      }
    }
  });
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
