import { arrayIndexOf, arrayLastIndexOf } from "./plugins/utils/builtin.js";
let cnum = 0;
const notinCmd = [];
class Compile {
  constructor(loop, prop = {}, usedBlocks_, old = this) {
    this.commands = [];
    this.loop = loop;
    this.prop = prop;
    this.memory = { get: memory.get, set: memory.set };
    const content = loop.objects[1].content;
    let i = 0;
    loop.objects[0].content.forEach((element) => {
      const compiler = new utils.compile(element, {}, usedBlocks_, this);
      usedBlocks_ = compiler.usedBlocks;
      const result1 = utils.minFun(compiler.commands, usedBlocks_, []);
      usedBlocks_ = result1[0];
      notinCmd.push(...result1[1]);
      loop.functions.push(result1[2]);
      loop.objects[0].content[i].run = result1[2];
      loop.objects[0].content[i].command_s = compiler.commands;

      i++;
    });
    this.self = old;
    for (let parsed_inst = 0; parsed_inst < content.length; parsed_inst++) {
      const element = content[parsed_inst];
      imports.forEach((import_) => {
        if (import_.name === element.type) {
          const rs = import_.export(
            element.arg,
            memory,
            this.commands,
            usedBlocks_,
            utils,
            this.self
          );
          if (rs) {
            if (rs.commands) {
              this.commands = rs.commands;
            }
            if (rs.memory) {
              memory = rs.memory;
            }
            if (rs.usedBlocks) {
              usedBlocks_ = rs.usedBlocks;
            }
          }
        }
      });
    }
    this.usedBlocks = usedBlocks_;
  }
}
function minecraftFunction(commandsOnRun, usedBlocks, commands) {
  usedBlocks += 2;
  const suv = parseInt(usedBlocks);
  let isAs = false;
  let isAt = false;
  let As = "";
  let At = "";
  usedBlocks += commandsOnRun.length * 2;
  usedBlocks += 1;
  commandsOnRun = [
    "S_setblock " +
      (utils.data.x + suv) +
      " " +
      utils.data.y +
      " " +
      utils.data.z +
      " air replace",
    ...commandsOnRun,
  ];
  for (let i = 0; i < commandsOnRun.length; i++) {
    commands.push(
      "setblock " +
        (utils.data.x + suv + 1 + i * 2) +
        " " +
        utils.data.y +
        " " +
        utils.data.z +
        " minecraft:repeater[powered=false,delay=1,facing=west]" +
        " replace"
    );
    if (commandsOnRun[i].startsWith("WAIT_")) {
      const command = commandsOnRun[i].split("WAIT_")[1];
      const x = suv + 1 + i * 2 + 1;
      commands.push(
        "/setblock " +
          (utils.data.x + x) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:repeater[powered=false,delay=" +
          command +
          ",facing=west]" +
          " replace"
      );
    } else if (commandsOnRun[i].startsWith("AS_")) {
      const x = suv + 1 + i * 2 + 1;
      As = commandsOnRun[i].split("AS_")[1];
      isAs = true;
      commands.push(
        "/setblock " +
          (utils.data.x + x) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:repeater[powered=false,delay=1,facing=west]" +
          " replace"
      );
    } else if (commandsOnRun[i].startsWith("AT_")) {
      const x = suv + 1 + i * 2 + 1;
      At = commandsOnRun[i].split("AT_")[1];
      isAt = true;
      commands.push(
        "/setblock " +
          (utils.data.x + x) +
          " " +
          utils.data.y +
          " " +
          utils.data.z +
          " minecraft:repeater[powered=false,delay=1,facing=west]" +
          " replace"
      );
    } else {
      let command = commandsOnRun[i];
      if (isAs) {
        command = "execute as " + As + " run " + command;
        isAs = false;
      }
      if (isAt) {
        command = "execute at " + At + " run " + command;
        isAt = false;
      }
      if (commandsOnRun[i].startsWith("S_")) {
        const x = suv + 1 + i * 2 + 1;
        commands.push(
          "setblock " +
            (utils.data.x + x) +
            " " +
            utils.data.y +
            " " +
            utils.data.z +
            " minecraft:repeating_command_block[facing=east]{Command:" +
            JSON.stringify(command.replace("S_", "")) +
            "} replace"
        );
      } else {
        const x = suv + 1 + i * 2 + 1;
        commands.push(
          "setblock " +
            (utils.data.x + x) +
            " " +
            utils.data.y +
            " " +
            utils.data.z +
            " command_block[facing=east]{Command:" +
            JSON.stringify(command) +
            "} replace"
        );
      }
    }
  }
  usedBlocks += 1;
  return [
    usedBlocks,
    commands,
    "setblock " +
      (utils.data.x + suv) +
      " " +
      utils.data.y +
      " " +
      utils.data.z +
      " redstone_block replace",
  ];
}
function concat(commands, random_num = parseInt(Math.random() * 10000)) {
  const supp_length = (
    '{Tags:["' +
    random_num +
    '"],id:command_block_minecart,Command:},'
  ).length;
  const comms = [[]];
  let curcom = 0;
  let curindex = 0;
  commands.forEach((command) => {
    curcom += supp_length + command.length;
    if (curcom > 31000) {
      curcom = 0;
      curindex++;
      comms.push([]);
      comms[curindex].push(command);
    } else {
      comms[curindex].push(command);
    }
  });
  cnum = random_num;
  const totalAll = [];
  comms.forEach((commandGroup) => {
    usedBlocks += 3;
    let totalString = "";
    let command =
      "summon command_block_minecart " +
      (utils.data.x - 1) +
      " " +
      utils.data.y +
      " " +
      utils.data.z +
      ' {Tags:["' +
      random_num +
      '"],Passengers:[REPLACE]}';
    commandGroup.forEach((command) => {
      totalString +=
        '{Tags:["' +
        random_num +
        '"],id:command_block_minecart,Command:' +
        JSON.stringify(command) +
        "},";
    });
    totalString = totalString.slice(0, -1);
    command = command.replace("REPLACE", totalString);
    totalAll.push(command);
  });
  return totalAll;
}
const imports = [];
let utils = {
  concat: concat,
  minFun: minecraftFunction,
  data: { x: -521, y: 302, z: -411 },
  compile: Compile,
};
let commands = [];
let memory = {
  get: () => {
    return _global;
  },
  set: (global) => {
    _global = global;
  },
  data: {},
};
let usedBlocks = 1;
const ext_list = {
  Bvar: "core/Bvar.js",
  As: "core/As.js",
  Wait: "core/Wait.js",
  At: "core/At.js",
  Svar: "core/Svar.js",
  Sadd: "core/SAdd.js",
  Srm: "core/SRm.js",
  Srand: "core/SRand.js",
  Sset: "core/SSet.js",
  SIf: "core/SIf.js",
  If: "core/If.js",
  Return: "core/Return.js",
  Run: "core/Run.js",
  Loop: "core/Loop.js",
  FLoop: "core/FLoop.js",
  FRun: "core/FRun.js",
  Types: "types/tps.mjs",
  BuiltInUtils: "utils/builtin.js",
  PrePossessor: "core/PPMJS",
  Minecraft: "core/Minecraft",
};
let _global;
class Type {
  constructor(type) {
    this.type = type;
    this.arg = {};
    this.code = "";
  }
  pushArg(name, arg) {
    this.arg[name] = arg;
  }
  setCode(code) {
    this.code = code;
  }
}
async function SingleInstruction(code) {
  code = code;
  if (code.startsWith("@import")) {
    const importName = code.replace("@import").split(" ")[1];
    for (const extName in ext_list) {
      if (Object.hasOwnProperty.call(ext_list, extName)) {
        const path = ext_list[extName];
        if (extName === importName) {
          const currentImport = await import("./plugins/" + path);
          imports.push({
            name: importName,
            import: currentImport._import,
            export: currentImport._export,
          });
        }
      }
    }
  } else if (code.startsWith("@Fimport")) {
    const importArgs = code.replace("@import").split(" ")[1];
    const importName = importArgs.split("::")[0];
    const importArg = importArgs.split("::")[1];
    for (const extName in ext_list) {
      if (Object.hasOwnProperty.call(ext_list, extName)) {
        const path = ext_list[extName];
        if (extName === importName) {
          const currentImport = await import(
            "./plugins/" + path + "/" + importArg + ".js"
          );
          imports.push({
            name: importName + "::" + importArg,
            import: currentImport._import,
            export: currentImport._export,
          });
        }
      }
    }
  }
}
class Section {
  constructor(type) {
    this.type = type;
    this.content = [];
  }
  push(inst) {
    this.content.push(inst);
  }
}
async function ImportSection(codeText) {
  const code = codeText.split(";");
  const inst = new Section("imp");
  for (let inst_index = 0; inst_index < code.length; inst_index++) {
    const instruction = code[inst_index];
    await SingleInstruction(instruction);
  }
  return { content: inst };
}
class Instruction {
  constructor(code, isInFun, self) {
    for (let index = 0; index < imports.length; index++) {
      const element = imports[index];
      const res = element.import(code, memory);
      let result;
      let fun;
      if (Object.prototype.toString.call(res) === "[object Array]") {
        result = res[0];
        fun = res[1];
      } else {
        result = res;
      }
      if (result !== null) {
        const type = new Type(element.name);
        type.setCode(code);
        for (const key in result) {
          if (Object.hasOwnProperty.call(result, key)) {
            const KeyContent = result[key];
            if (KeyContent.startsWith("%")) {
              if (memory[KeyContent.replace("%", "")]) {
                type.pushArg(key, memory[KeyContent.replace("%", "")]);
              }
            } else {
              type.pushArg(key, KeyContent);
            }
          }
        }
        if (typeof fun === "function" && isInFun !== "f") {
          fun(memory, result, self);
        } else if (typeof fun === "function") {
          type.pushArg("ppcallback", fun);
          memory = type.arg.ppcallback(memory, type.arg);
        }
        this.content = type;
      }
    }
    if (!this.content) {
      this.content = code;
    }
  }
}
class TextSection {
  constructor(codeText, f, self) {
    let code = codeText.split(";");
    this.content = [];
    for (let inst_index = 0; inst_index < code.length; inst_index++) {
      const instruction = code[inst_index];
      const instructionObject = new Instruction(instruction, f, self);
      this.content.push(instructionObject.content);
    }
  }
}
class FunctionSection {
  constructor(codeText) {
    this.funs = [];
    let code = codeText.split(";");
    const inst = [];
    const isinfun = false;
    for (let inst_index = 0; inst_index < code.length; inst_index++) {
      const instruction = code[inst_index];
      if (instruction.startsWith("fun<")) {
        const name = instruction.replace("fun<", "").split(">")[0];
        code[inst_index] = code[inst_index].replace(
          "fun<" + name + ">()-:",
          ""
        );
        code = code.filter((str) => /\w+/.test(str));
        let tcode = [...code];
        tcode.splice(0, inst_index);
        const last = arrayLastIndexOf(tcode, name + "_END");
        code[arrayLastIndexOf(code, name + "_END")] = code[
          arrayLastIndexOf(code, name + "_END")
        ].replace(name + "_END", "");
        tcode.splice(last, tcode.length);
        inst_index += last - inst_index - 1;
        const loop = new Loop(name);
        loop.setCode(tcode.join(";"));
        inst.push(loop);
      }
    }
    this.content = inst;
  }
}
class Loop {
  constructor(name) {
    this.name = name;
    this.objects = [];
    this.functions = [];
    this.run = "";
    this.command_s = "";
  }
  addObject(TypeObject) {
    this.objects.push(TypeObject);
  }
  async setCode(code) {
    const codeSplit = code.split("#" + this.name + "#");
    codeSplit.shift();
    for (let section = 0; section < codeSplit.length; section++) {
      let sectionCode = codeSplit[section];
      sectionCode = sectionCode.replaceAll("\n", "");
      const sectionSplit = sectionCode.split(";");
      if (sectionSplit[0] === "imp") {
        if (
          sectionCode.replace("imp;", "").replace(new RegExp(";" + "$"), "") !==
          "imp;NULL"
        ) {
          const ImpSec = await ImportSection(
            sectionCode.replace("imp;", "").replace(new RegExp(";" + "$"), "")
          );
        }
      } else if (sectionSplit[0] === "fun") {
        if (
          sectionCode.replace("fun;", "").replace(new RegExp(";" + "$"), "") !==
          "fun;NULL"
        ) {
          const FunSec = new FunctionSection(
            sectionCode.replace("fun;", "").replace(new RegExp(";" + "$"), "")
          );
          this.objects.push(FunSec);
        }
      } else if (sectionSplit[0] === "text") {
        if (
          sectionCode.replace("fun;", "").replace(new RegExp(";" + "$"), "") !==
          "fun;NULL"
        ) {
          const TextSec = new TextSection(
            sectionCode.replace("text;", "").replace(new RegExp(";" + "$"), ""),
            this.name !== "!" ? "f" : "!",
            this
          );
          this.objects.push(TextSec);
        }
      }
    }
  }
}
async function parse(codeText, name, x, y, z) {
  utils = {
    concat: concat,
    minFun: minecraftFunction,
    data: { x: x, y: y, z: z },
    compile: Compile,
  };
  _global = new Loop(name);
  let isInQuotes = false;
  let totalString = "";
  let LastChar = "";
  for (let char = 0; char < codeText.length; char++) {
    const element = codeText[char];
    if (element === ";") {
      if (isInQuotes) {
        totalString += "%QUOTES";
      } else {
        totalString += ";";
      }
    } else if (element === '"') {
      if (!isInQuotes) {
        isInQuotes = true;
      } else {
        if (LastChar !== "\\") {
          isInQuotes = false;
        }
      }
      totalString += element;
    } else {
      totalString += element;
    }
    LastChar = element;
  }
  totalString = totalString
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => Boolean(line))
    .join("\n");
  _global.prop = { tagId: 1111 };
  await _global.setCode(totalString);
  const compiler = new Compile(_global, { tagId: 1111 }, 0);
  const answer = minecraftFunction(
    compiler.commands,
    compiler.usedBlocks,
    commands
  );
  const totCom = concat([...notinCmd, ...answer[1], answer[2]], 1111);
  return [totCom, answer[0]];
}
window["parse"] = parse;
