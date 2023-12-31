export enum Tokens {
  passthrough = "passthrough",
  string = "string", // "string"
  whitespace = "whitespace", // " " or "\t"

  integer = "integer", // 123
  float = "float", // 123.456

  identifier = "identifier", // abc
  heading = "heading", // # abc
  newline = "newline", // \n

  colon = "colon", // :
  comma = "comma", // ,
  dot = "dot", // .
  equals = "equals", // =

  plus = "plus", // +
  minus = "minus", // -
  asterisk = "asterisk", // *
  slash = "slash", // /
  percent = "percent", // %
  exponent = "exponent", // **
  doubleSlash = "doubleSlash", // //
  caret = "caret", // ^
  tilde = "tilde", // ~

  dollar = "dollar", // $ or $aaa
  doubleDollar = "doubleDollar", // $$ or $$aaa
  and = "and", // &
  backslash = "backslash", // \
  forwardslash = "forwardslash", // /

  openParen = "openParen", // (
  closeParen = "closeParen", // )
  openBracket = "openBracket", // [
  closeBracket = "closeBracket", // ]
  openBrace = "openBrace", // {
  closeBrace = "closeBrace", // }
}

export type TokenType = Tokens;

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  col: number;
  index: number;
}

export interface TokenStream {
  readonly index: number;
  readonly line: number;
  readonly col: number;

  peek(): Token;
  next(): Token;
  eof(): boolean;
}

export function createTokenStream(tokens: Token[]) {
  let index = 0;

  return {
    get index() {
      return index;
    },
    get line() {
      return tokens[index - 1]?.line ?? 1;
    },
    get col() {
      return tokens[index - 1]?.col ?? 0;
    },

    peek() {
      return tokens[index];
    },

    next() {
      return tokens[index++];
    },

    eof() {
      return index >= tokens.length;
    },
  };
}
