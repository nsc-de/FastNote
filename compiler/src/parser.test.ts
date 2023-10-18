import { Parser, TextWrapperNode } from "./parser";
import { Tokens, createTokenStream } from "./tokens";

describe("Parser", () => {
  it("should create a new parser", () => {
    const tokens = createTokenStream([]);
    const parser = new Parser(tokens);
    expect(parser).toBeDefined();
  });

  describe("parseTextBasedNode()", () => {
    describe("regular", () => {
      it("should parse single passthrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.passthrough,
            value: "hello",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(TextWrapperNode);
        expect((node as TextWrapperNode).text).toBe("hello");
      });

      it("should parse multiple passthrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.passthrough,
            value: "hello",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.passthrough,
            value: "world",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(TextWrapperNode);
        expect((node as TextWrapperNode).text).toBe("helloworld");
      });

      it("should only parse single non-passthrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBrace,
            value: "hello",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeBrace,
            value: "world",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(TextWrapperNode);
        expect((node as TextWrapperNode).text).toBe("hello");
      });
    });
  });
});
