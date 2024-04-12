export function _import(inputString) {
  const regex = /^Loop\s+(\w+)\(\)/;

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
      usedBlocks += 8;

      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks - 5) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:repeater[powered=false,delay=1,facing=west] replace"
      );
      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks - 4) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:command_block[facing=east]{Command:" +
          JSON.stringify(
            "setblock " +
              (utils.data.x + (usedBlocks - 6)) +
              " " +
              utils.data.y +
              " " +
              utils.data.z +
              " air replace"
          ) +
          "}"
      );
      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks - 3) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:repeater[powered=false,delay=1,facing=west] replace"
      );
      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks - 2) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:command_block[facing=east]{Command:" +
          JSON.stringify(element.run) +
          "}"
      );
      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks - 1) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:repeater[powered=false,delay=1,facing=west] replace"
      );
      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:command_block[facing=east]{Command:" +
          JSON.stringify(
            "setblock " +
              (utils.data.x + usedBlocks - 6) +
              " " +
              utils.data.y +
              " " +
              utils.data.z +
              " redstone_block replace"
          ) +
          "}"
      );
      commands.push(
        "setblock " +
          (utils.data.x + usedBlocks - 6) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " redstone_block replace"
      );
    }
  });
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
