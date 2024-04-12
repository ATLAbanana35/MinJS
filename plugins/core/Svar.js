export function _import(inputString) {
  const regex = /^(.*?)\sSvar\s+(\w+)\s+=\s+(\d+)/;
  const match = inputString.match(regex);
  if (match) {
    const selector = match[1];
    const variableName = match[2];
    const value = match[3];
    return { selector: selector, name: variableName, value: value };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils) {
  commands.push("scoreboard objectives add " + args.name + " dummy");
  commands.push(
    "/scoreboard players set " +
      args.selector +
      " " +
      args.name +
      " " +
      args.value
  );
  const currentBlock = usedBlocks;
  const result1 = utils.minFun(
    ["scoreboard players add " + args.selector + " " + args.name + " 1"],
    usedBlocks,
    []
  );
  usedBlocks = result1[0];
  commands.push(...result1[1]);
  const result2 = utils.minFun(
    ["scoreboard players remove " + args.selector + " " + args.name + " 1"],
    usedBlocks,
    []
  );
  usedBlocks = result2[0];
  commands.push(...result2[1]);
  memory.data[args.name] = {
    type: "Svar",
    random:
      "execute store result score " +
      args.selector +
      " " +
      args.name +
      " run random value [MIN]..[MAX]",
    name: args.name,
    add: result1[2],
    remove: result2[2],
    set: (number) => {
      return (
        "scoreboard players set " +
        args.selector +
        " " +
        args.name +
        " " +
        number
      );
    },
    get: (number, command, op, other = null, otherselector = "@p") => {
      if (other) {
        return (
          "execute if score " +
          args.selector +
          " " +
          args.name +
          " " +
          op +
          " " +
          otherselector +
          " " +
          other +
          " run " +
          command
        );
      } else {
        if (op === "<") {
          return (
            "execute as " +
            args.selector +
            " if entity @s[scores={" +
            args.name +
            "=.." +
            (parseInt(number) - 1) +
            "}] run " +
            command
          );
        } else if (op === ">") {
          return (
            "execute as " +
            args.selector +
            " if entity @s[scores={" +
            args.name +
            "=" +
            (parseInt(number) + 1) +
            "..}] run " +
            command
          );
        } else if (op === "=") {
          return (
            "execute as " +
            args.selector +
            " if entity @s[scores={" +
            args.name +
            "=" +
            number +
            "}] run " +
            command
          );
        }
      }
    },
  };
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
