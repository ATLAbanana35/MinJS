export function _import(inputString) {
  const regex = /^Bvar\s+(\w+)\s+=\s+(\d+)/;
  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];
    const value = match[2];
    return { name: variableName, value: value };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  const currentBlock = usedBlocks;
  usedBlocks += 2;
  const result1 = utils.minFun(
    [
      "setblock " +
        (utils.data.x + currentBlock) +
        " " +
        (utils.data.y + 11) +
        " " +
        utils.data.z +
        " sand replace",
    ],
    usedBlocks,
    []
  );
  usedBlocks = result1[0];
  commands.push(...result1[1]);
  const result2 = utils.minFun(
    [
      "setblock " +
        (utils.data.x + currentBlock) +
        " " +
        utils.data.y +
        " " +
        utils.data.z +
        " air replace",
    ],
    usedBlocks,
    []
  );
  usedBlocks = result2[0];
  commands.push(...result2[1]);
  for (let ind = 0; ind < parseInt(args.value); ind++) {
    commands.push(result1[2]);
    commands.push("WAIT_4");
    commands.push("WAIT_4");
    commands.push("WAIT_4");
  }
  memory.data[args.name] = {
    type: "Bvar",
    name: args.name,
    add: result1[2],
    remove: result2[2],
    get: (number, command, op) => {
      if (op === "<") {
        return (
          "execute if block " +
          (utils.data.x + currentBlock) +
          " " +
          (utils.data.y + parseInt(number) - 1) +
          " " +
          utils.data.z +
          " air run " +
          command
        );
      } else if (op === ">") {
        return (
          "execute if block " +
          (utils.data.x + currentBlock) +
          " " +
          (utils.data.y + parseInt(number) - 1) +
          " " +
          utils.data.z +
          " sand run " +
          command
        );
      } else if (op === "=") {
        return (
          "execute if block " +
          (utils.data.x + currentBlock) +
          " " +
          (utils.data.y + parseInt(number) - 1) +
          " " +
          utils.data.z +
          " sand run " +
          "execute if block " +
          (utils.data.x + currentBlock) +
          " " +
          (utils.data.y + parseInt(number)) +
          " " +
          utils.data.z +
          " air run " +
          command
        );
      }
    },
  };
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
