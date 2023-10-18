import { createCharacterInputStream } from "./characters";
import { Lexer } from "./lexer";

describe("Lexer", () => {
  it("should create a new lexer", () => {
    const lexer = new Lexer(createCharacterInputStream(""));
    expect(lexer).toBeDefined();
  });

  it("empty should be eof", () => {
    const lexer = new Lexer(createCharacterInputStream(""));
    expect(lexer.eof()).toBe(true);
  });

  it("should not be eof if tokens are left", () => {
    const lexer = new Lexer(createCharacterInputStream("a"));
    expect(lexer.eof()).toBe(false);
  });

  describe("heading", () => {
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
  });

  describe("newline", () => {
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

  describe("colon", () => {
    it("lex colons", () => {
      const lexer = new Lexer(createCharacterInputStream(":"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "colon",
        value: ":",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("comma", () => {
    it("lex commas", () => {
      const lexer = new Lexer(createCharacterInputStream(","));
      const token = lexer.next();
      expect(token).toEqual({
        type: "comma",
        value: ",",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("dot", () => {
    it("lex dots", () => {
      const lexer = new Lexer(createCharacterInputStream("."));
      const token = lexer.next();
      expect(token).toEqual({
        type: "dot",
        value: ".",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("equals", () => {
    it("lex equals", () => {
      const lexer = new Lexer(createCharacterInputStream("="));
      const token = lexer.next();
      expect(token).toEqual({
        type: "equals",
        value: "=",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("plus", () => {
    it("lex plus", () => {
      const lexer = new Lexer(createCharacterInputStream("+"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "plus",
        value: "+",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("minus", () => {
    it("lex minus", () => {
      const lexer = new Lexer(createCharacterInputStream("-"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "minus",
        value: "-",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("asterisk", () => {
    it("lex asterisk", () => {
      const lexer = new Lexer(createCharacterInputStream("*"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "asterisk",
        value: "*",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("slash", () => {
    it("lex slash", () => {
      const lexer = new Lexer(createCharacterInputStream("/"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "slash",
        value: "/",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("percent", () => {
    it("lex percent", () => {
      const lexer = new Lexer(createCharacterInputStream("%"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "percent",
        value: "%",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("exponent", () => {
    it("lex exponent", () => {
      const lexer = new Lexer(createCharacterInputStream("**"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "exponent",
        value: "**",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("doubleSlash", () => {
    it("lex doubleSlash", () => {
      const lexer = new Lexer(createCharacterInputStream("//"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "doubleSlash",
        value: "//",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("caret", () => {
    it("lex caret", () => {
      const lexer = new Lexer(createCharacterInputStream("^"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "caret",
        value: "^",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("dollar", () => {
    it("lex dollar", () => {
      const lexer = new Lexer(createCharacterInputStream("$"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "dollar",
        value: "$",
        line: 1,
        col: 1,
        index: 0,
      });
    });

    it("lex dollar-descriptor", () => {
      const lexer = new Lexer(createCharacterInputStream("$a"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "dollar",
        value: "$a",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("backslash", () => {
    it("lex backslash", () => {
      const lexer = new Lexer(createCharacterInputStream("\\"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "backslash",
        value: "\\",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("forwardslash", () => {
    it("lex forwardslash", () => {
      const lexer = new Lexer(createCharacterInputStream("/"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "slash",
        value: "/",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("openParen", () => {
    it("lex openParen", () => {
      const lexer = new Lexer(createCharacterInputStream("("));
      const token = lexer.next();
      expect(token).toEqual({
        type: "openParen",
        value: "(",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("closeParen", () => {
    it("lex closeParen", () => {
      const lexer = new Lexer(createCharacterInputStream(")"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "closeParen",
        value: ")",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("openBracket", () => {
    it("lex openBracket", () => {
      const lexer = new Lexer(createCharacterInputStream("["));
      const token = lexer.next();
      expect(token).toEqual({
        type: "openBracket",
        value: "[",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("closeBracket", () => {
    it("lex closeBracket", () => {
      const lexer = new Lexer(createCharacterInputStream("]"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "closeBracket",
        value: "]",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("openBrace", () => {
    it("lex openBrace", () => {
      const lexer = new Lexer(createCharacterInputStream("{"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "openBrace",
        value: "{",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("closeBrace", () => {
    it("lex closeBrace", () => {
      const lexer = new Lexer(createCharacterInputStream("}"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "closeBrace",
        value: "}",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("identifier", () => {
    it("lex identifier", () => {
      const lexer = new Lexer(createCharacterInputStream("a"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "identifier",
        value: "a",
        line: 1,
        col: 1,
        index: 0,
      });
    });

    it("lex identifier with multiple characters", () => {
      const lexer = new Lexer(createCharacterInputStream("abc"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "identifier",
        value: "abc",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("integer", () => {
    it("lex number", () => {
      const lexer = new Lexer(createCharacterInputStream("1"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "integer",
        value: "1",
        line: 1,
        col: 1,
        index: 0,
      });
    });

    it("lex number with multiple digits", () => {
      const lexer = new Lexer(createCharacterInputStream("123"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "integer",
        value: "123",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("float", () => {
    it("lex float", () => {
      const lexer = new Lexer(createCharacterInputStream("1.1"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "float",
        value: "1.1",
        line: 1,
        col: 1,
        index: 0,
      });
    });

    it("lex float with multiple digits", () => {
      const lexer = new Lexer(createCharacterInputStream("123.456"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "float",
        value: "123.456",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("passthrough", () => {
    it("lex passthrough", () => {
      const lexer = new Lexer(createCharacterInputStream("©"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "passthrough",
        value: "©",
        line: 1,
        col: 1,
        index: 0,
      });
    });
  });

  describe("stream", () => {
    it("lex stream", () => {
      const lexer = new Lexer(createCharacterInputStream("a"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "identifier",
        value: "a",
        line: 1,
        col: 1,
        index: 0,
      });
    });

    it("lex stream with multiple characters", () => {
      const lexer = new Lexer(createCharacterInputStream("abc"));
      const token = lexer.next();
      expect(token).toEqual({
        type: "identifier",
        value: "abc",
        line: 1,
        col: 1,
        index: 0,
      });
    });

    it("lex stream with multiple tokens", () => {
      const lexer = new Lexer(createCharacterInputStream("a(b"));
      const token1 = lexer.next();
      const token2 = lexer.next();
      const token3 = lexer.next();
      expect(token1).toEqual({
        type: "identifier",
        value: "a",
        line: 1,
        col: 1,
        index: 0,
      });
      expect(token2).toEqual({
        type: "openParen",
        value: "(",
        line: 1,
        col: 2,
        index: 1,
      });

      expect(token3).toEqual({
        type: "identifier",
        value: "b",
        line: 1,
        col: 3,
        index: 2,
      });
    });
  });
});
