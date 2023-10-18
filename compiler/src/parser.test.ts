import { BoldNode, JoinNode, Parser, TextWrapperNode } from "./parser";
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

    describe("bold", () => {
      it("should parse empty bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(BoldNode);
        const boldNode = node as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("");
      });

      it("should parse single passthrough bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.passthrough,
            value: "hello",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(BoldNode);
        const boldNode = node as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("hello");
      });

      it("should parse multiple passthrough bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
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
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(BoldNode);
        const boldNode = node as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("helloworld");
      });

      it("should parse single non-passthrough bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openBrace,
            value: "(",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(BoldNode);
        const boldNode = node as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("(");
      });
      it("should parse multiple non-passthrough bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openBrace,
            value: "(",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openBrace,
            value: "(",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(BoldNode);
        const boldNode = node as BoldNode;
        expect(boldNode.text).toBeInstanceOf(JoinNode);
        const joinNode = boldNode.text as JoinNode;
        expect(joinNode.text).toHaveLength(2);
        expect(joinNode.text[0]).toBeInstanceOf(TextWrapperNode);
        expect((joinNode.text[0] as TextWrapperNode).text).toBe("(");
        expect(joinNode.text[1]).toBeInstanceOf(TextWrapperNode);
        expect((joinNode.text[1] as TextWrapperNode).text).toBe("(");
      });
    });
  });
});
