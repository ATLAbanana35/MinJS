export function _import(inputString) {
  const regex = /^When<+(.*?)>\(+(.*?)&+(\w+)\):\s*(\w+)/;
  const match = inputString.match(regex);

  if (match) {
    const obj_type = match[1];
    const selector = match[2];
    const obj_name = match[3];
    const funName = match[4];
    return {
      obj_type: obj_type,
      obj_name: obj_name,
      selector: selector,
      funName: funName,
    };
  } else {
    return null;
  }
}
export function _export(args, memory, commands, usedBlocks, utils, self) {
  let com_to_run = "";
  const functions = self.loop.objects[0].content;

  functions.forEach((element) => {
    if (element.name === args.funName) {
      com_to_run = element.run;
    }
  });
  commands.push(
    "scoreboard objectives add " + args.obj_name + " " + args.obj_type
  );
  commands.push(
    "execute as " +
      args.selector +
      " if entity @s[scores={" +
      args.obj_name +
      "=1..}] run " +
      com_to_run
  );
  return { commands: commands, memory: memory, usedBlocks: usedBlocks };
}
