import { createCharacterInputStream } from "./characters";
import { Lexer } from "./lexer";

describe("Lexer", () => {
  it("should create a new lexer", () => {
    const lexer = new Lexer(createCharacterInputStream(""));
    expect(lexer).toBeDefined();
  });

  it("should lex a heading", () => {
    const lexer = new Lexer(createCharacterInputStream("#"));
    const token = lexer.next();
    expect(token).toEqual({
      type: "heading",
      value: "#",
      line: 1,
      col: 1,
      index: 0,
    });
  });

  it("lex a heading with multiple hashes", () => {
    const lexer = new Lexer(createCharacterInputStream("###"));
    const token = lexer.next();
    expect(token).toEqual({
      type: "heading",
      value: "###",
      line: 1,
      col: 1,
      index: 0,
    });
  });

  it("lex newlines", () => {
    const lexer = new Lexer(createCharacterInputStream("\n"));
    const token = lexer.next();
    expect(token).toEqual({
      type: "newline",
      value: "\n",
      line: 1,
      col: 1,
      index: 0,
    });
  });
});
