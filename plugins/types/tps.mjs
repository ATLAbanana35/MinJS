import { replaceVariables } from "../utils/builtin.js";
export class String {
  constructor(code, vars) {
    const s = code.indexOf('"');
    const a = code.lastIndexOf('"');
    code = code.slice(s + 1, a);
    code = replaceVariables(code, vars);
    code.replaceAll("%QUOTE", ";");
    this.content = code;
  }
}
