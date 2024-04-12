function ppre(memory, infos, self) {
  const funSec = self.objects[0].content;
  funSec.forEach((element) => {
    if (element.name === infos.name) {
      element.objects[1].content.forEach((inst) => {
        if (inst) {
          if (typeof inst.arg.ppcallback === "function") {
            inst.arg.ppcallback(memory, inst.arg, element);
          }
        }
      });
    }
  });
  return memory;
}
export function _import(inputString, memory, self) {
  const regex = /^PPfun\s+(\w+)\(\)/;

  const match = inputString.match(regex);
  if (match) {
    const variableName = match[1];

    return [{ name: variableName }, ppre];
  } else {
    return null;
  }
}
export function _export(inputString) {}
