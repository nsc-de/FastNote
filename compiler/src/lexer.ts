import { CharacterInputStream } from "./characters";
import { Token, Tokens } from "./tokens";

export class Lexer {
  constructor(readonly source: CharacterInputStream) {}

  next() {
    const char = this.source.peek();

    if (char === "#") return this.heading();
    if (char === "\n") return this.newline();

    // PASSTHROUGH
  }

  heading(): Token {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    while (this.source.peek() === "#") {
      value += this.source.next();
    }

    return {
      type: Tokens.heading,
      value,
      line,
      col,
      index,
    };
  }

  newline(): Token {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    return {
      type: Tokens.newline,
      value: "\n",
      line,
      col,
      index,
    };
  }
}
