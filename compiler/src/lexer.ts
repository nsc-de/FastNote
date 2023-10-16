import { CharacterInputStream } from "./characters";

class Lexer {
  constructor(readonly source: CharacterInputStream) {}

  next() {
    const char = this.source.peek();

    if (char === "#") return this.heading();
    if (char === "\n") return this.newline();
  }

  heading() {
    let value = "";

    while (this.source.peek() === "#") {
      value += this.source.next();
    }

    return {
      type: "heading",
      value,
      line: this.source.line,
      col: this.source.col,
      index: this.source.index,
    };
  }

  newline() {
    return {
      type: "newline",
      value: "\n",
      line: this.source.line,
      col: this.source.col,
      index: this.source.index,
    };
  }
}
