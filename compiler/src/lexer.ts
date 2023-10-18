import { CharacterInputStream } from "./characters";
import { Token, Tokens, createTokenStream } from "./tokens";

export class Lexer {
  private tokenBuffer: Token[] = [];
  constructor(readonly source: CharacterInputStream) {}

  next() {
    if (this.tokenBuffer.length > 0) return this.tokenBuffer.shift();

    const char = this.source.peek();

    if (char === " " || char === "\t") return this.space();
    if (char === "#") return this.heading();
    if (char === "\n") return this.newline();
    if (char === ":") return this.colon();
    if (char === ",") return this.comma();
    if (char === ".") return this.dot();
    if (char === "=") return this.equals();
    if (char === "~") return this.tilde();
    if (char === "+") return this.plus();
    if (char === "-") return this.minus();
    if (char === "*") return this.asterisk();
    if (char === "/") return this.slash();
    if (char === "%") return this.percent();
    if (char === "^") return this.caret();
    if (char === "$") return this.dollar();
    if (char === "&") return this.and();
    if (char === "\\") return this.backslash();
    if (char === "/") return this.forwardslash();
    if (char === "(") return this.openParen();
    if (char === ")") return this.closeParen();
    if (char === "[") return this.openBracket();
    if (char === "]") return this.closeBracket();
    if (char === "{") return this.openBrace();
    if (char === "}") return this.closeBrace();
    if (/[\d]/.test(char)) return this.float();
    if (/[\w]/.test(char)) return this.identifier();

    // PASSTHROUGH

    return this.passthrough();
  }

  eof() {
    return this.tokenBuffer.length === 0 && this.source.eof();
  }

  stream() {
    const tokens: Token[] = [];

    while (!this.eof()) tokens.push(this.next()!);

    return createTokenStream(tokens);
  }

  popBuffer() {
    return this.tokenBuffer.shift();
  }

  space() {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    while (this.source.peek() === " " || this.source.peek() === "\t") {
      value += this.source.next();
    }

    this.tokenBuffer.push({
      type: Tokens.whitespace,
      value,
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  tilde() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.tokenBuffer.push({
      type: Tokens.tilde,
      value: "~",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  heading() {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    while (this.source.peek() === "#") {
      value += this.source.next();
    }

    this.tokenBuffer.push({
      type: Tokens.heading,
      value,
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  newline() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.newline,
      value: "\n",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  colon() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.colon,
      value: ":",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  comma() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.comma,
      value: ",",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  dot() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.dot,
      value: ".",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  equals() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.equals,
      value: "=",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  plus() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.plus,
      value: "+",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  minus() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.minus,
      value: "-",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  asterisk() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    if (this.source.peek() === "*") {
      this.source.next();
      this.tokenBuffer.push({
        type: Tokens.exponent,
        value: "**",
        line,
        col,
        index,
      });
    } else {
      this.tokenBuffer.push({
        type: Tokens.asterisk,
        value: "*",
        line,
        col,
        index,
      });
    }

    return this.popBuffer();
  }

  slash() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    if (this.source.peek() === "/") {
      this.source.next();
      this.tokenBuffer.push({
        type: Tokens.doubleSlash,
        value: "//",
        line,
        col,
        index,
      });
    } else {
      this.tokenBuffer.push({
        type: Tokens.slash,
        value: "/",
        line,
        col,
        index,
      });
    }

    return this.popBuffer();
  }

  percent() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.percent,
      value: "%",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  caret() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();
    this.tokenBuffer.push({
      type: Tokens.caret,
      value: "^",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  dollar() {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    if (this.source.peek() === "$") {
      value += this.source.next();
    }

    while (/[\w]/.test(this.source.peek())) value += this.source.next();

    this.tokenBuffer.push({
      type: Tokens.dollar,
      value,
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  and() {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    if (this.source.peek() === "&") {
      value += this.source.next();
    }

    while (/[\w]/.test(this.source.peek())) value += this.source.next();

    this.tokenBuffer.push({
      type: Tokens.and,
      value,
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  backslash() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.tokenBuffer.push({
      type: Tokens.backslash,
      value: "\\",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  forwardslash() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.tokenBuffer.push({
      type: Tokens.forwardslash,
      value: "/",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  openParen() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();

    this.tokenBuffer.push({
      type: Tokens.openParen,
      value: "(",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  closeParen() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();

    this.tokenBuffer.push({
      type: Tokens.closeParen,
      value: ")",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  openBracket() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();

    this.tokenBuffer.push({
      type: Tokens.openBracket,
      value: "[",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  closeBracket() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();

    this.tokenBuffer.push({
      type: Tokens.closeBracket,
      value: "]",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  openBrace() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();

    this.tokenBuffer.push({
      type: Tokens.openBrace,
      value: "{",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  closeBrace() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.source.next();

    this.tokenBuffer.push({
      type: Tokens.closeBrace,
      value: "}",
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  identifier() {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    while (/[\w]/.test(this.source.peek())) {
      value += this.source.next();
    }

    this.tokenBuffer.push({
      type: Tokens.identifier,
      value,
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  float() {
    let value = "";

    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    while (/[\d]/.test(this.source.peek())) {
      value += this.source.next();
    }

    let hasDecimal = false;

    if (this.source.peek() === ".") {
      hasDecimal = true;
      value += this.source.next();
      while (/[\d]/.test(this.source.peek())) {
        value += this.source.next();
      }
    }

    this.tokenBuffer.push({
      type: hasDecimal ? Tokens.float : Tokens.integer,
      value,
      line,
      col,
      index,
    });

    return this.popBuffer();
  }

  passthrough() {
    const col = this.source.col;
    const line = this.source.line;
    const index = this.source.index;

    this.tokenBuffer.push({
      type: Tokens.passthrough,
      value: this.source.next(),
      line,
      col,
      index,
    });

    return this.popBuffer();
  }
}
