import { Parser } from "./parser";
import {
  BoldNode,
  FormulaNode,
  HeadingNode,
  HyperlinkNode,
  ItalicNode,
  JoinNode,
  ParagraphNode,
  StrikethroughNode,
  TextWrapperNode,
} from "./nodes";
import { Tokens, createTokenStream } from "./tokens";

describe("Parser", () => {
  it("should create a new parser", () => {
    const tokens = createTokenStream([]);
    const parser = new Parser(tokens);
    expect(parser).toBeDefined();
  });

  describe("parseTextBasedNode", () => {
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

      it("dollar should create symbol", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.dollar,
            value: "$copy",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(TextWrapperNode);
        expect((node as TextWrapperNode).text).toBe("©");
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

      it("test nested italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
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
        expect(boldNode.text).toBeInstanceOf(ItalicNode);
        const italicNode = boldNode.text as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("(");
      });

      it("test nested strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
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
        expect(boldNode.text).toBeInstanceOf(StrikethroughNode);
        const strikethroughNode = boldNode.text as StrikethroughNode;
        expect(strikethroughNode.text).toBeInstanceOf(TextWrapperNode);
        expect((strikethroughNode.text as TextWrapperNode).text).toBe("(");
      });

      it("test dollar symbol", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.exponent,
            value: "**",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.dollar,
            value: "$copy",
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
        expect((boldNode.text as TextWrapperNode).text).toBe("©");
      });
    });

    describe("italic", () => {
      it("should parse empty italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("");
      });

      it("should parse single passthrough italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("hello");
      });

      it("should parse multiple passthrough italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("helloworld");
      });

      it("should parse single non-passthrough italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("(");
      });

      it("should parse multiple non-passthrough italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(JoinNode);
        const joinNode = italicNode.text as JoinNode;
        expect(joinNode.text).toHaveLength(2);
        expect(joinNode.text[0]).toBeInstanceOf(TextWrapperNode);
        expect((joinNode.text[0] as TextWrapperNode).text).toBe("(");
        expect(joinNode.text[1]).toBeInstanceOf(TextWrapperNode);
        expect((joinNode.text[1] as TextWrapperNode).text).toBe("(");
      });

      it("test nested bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
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
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(BoldNode);
        const boldNode = italicNode.text as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("(");
      });

      it("test nested strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(StrikethroughNode);
        const strikethroughNode = italicNode.text as StrikethroughNode;
        expect(strikethroughNode.text).toBeInstanceOf(TextWrapperNode);
        expect((strikethroughNode.text as TextWrapperNode).text).toBe("(");
      });

      it("test dollar symbol", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.dollar,
            value: "$copy",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ItalicNode);
        const italicNode = node as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("©");
      });
    });

    describe("strikethrough", () => {
      it("should parse empty strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("");
      });

      it("should parse single passthrough strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("hello");
      });

      it("should parse multiple passthrough strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("helloworld");
      });

      it("should parse single non-passthrough strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("(");
      });

      it("should parse multiple non-passthrough strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const italicNode = node as BoldNode;
        expect(italicNode.text).toBeInstanceOf(JoinNode);
        const joinNode = italicNode.text as JoinNode;
        expect(joinNode.text).toHaveLength(2);
        expect(joinNode.text[0]).toBeInstanceOf(TextWrapperNode);
        expect((joinNode.text[0] as TextWrapperNode).text).toBe("(");
        expect(joinNode.text[1]).toBeInstanceOf(TextWrapperNode);
        expect((joinNode.text[1] as TextWrapperNode).text).toBe("(");
      });

      it("test nested bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
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
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const strikeThroughNode = node as StrikethroughNode;
        expect(strikeThroughNode.text).toBeInstanceOf(BoldNode);
        const boldNode = strikeThroughNode.text as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("(");
      });

      it("test nested italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const strikeThroughNode = node as StrikethroughNode;
        expect(strikeThroughNode.text).toBeInstanceOf(ItalicNode);

        const italicNode = strikeThroughNode.text as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("(");
      });

      it("test dollar symbol", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.dollar,
            value: "$copy",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(StrikethroughNode);
        const italicNode = node as StrikethroughNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("©");
      });
    });

    describe("hyperlink", () => {
      it("should parse empty hyperlink", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBracket,
            value: "[",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeBracket,
            value: "]",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openParen,
            value: "(",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeParen,
            value: ")",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HyperlinkNode);
        const hyperlinkNode = node as HyperlinkNode;
        expect(hyperlinkNode.text).toBeInstanceOf(TextWrapperNode);
        expect((hyperlinkNode.text as TextWrapperNode).text).toBe("");
        expect(hyperlinkNode.url).toBe("");
      });

      it("should parse single passthrough hyperlink", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBracket,
            value: "[",
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
            type: Tokens.closeBracket,
            value: "]",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openParen,
            value: "(",
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
            type: Tokens.closeParen,
            value: ")",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HyperlinkNode);
        const hyperlinkNode = node as HyperlinkNode;
        expect(hyperlinkNode.text).toBeInstanceOf(TextWrapperNode);
        expect((hyperlinkNode.text as TextWrapperNode).text).toBe("hello");
        expect(hyperlinkNode.url).toBe("world");
      });

      it("test with nested bold", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBracket,
            value: "[",
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
          {
            type: Tokens.closeBracket,
            value: "]",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openParen,
            value: "(",
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
            type: Tokens.closeParen,
            value: ")",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HyperlinkNode);
        const hyperlinkNode = node as HyperlinkNode;
        expect(hyperlinkNode.text).toBeInstanceOf(BoldNode);
        const boldNode = hyperlinkNode.text as BoldNode;
        expect(boldNode.text).toBeInstanceOf(TextWrapperNode);
        expect((boldNode.text as TextWrapperNode).text).toBe("hello");
        expect(hyperlinkNode.url).toBe("world");
      });

      it("test with nested italic", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBracket,
            value: "[",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeBracket,
            value: "]",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openParen,
            value: "(",
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
            type: Tokens.closeParen,
            value: ")",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HyperlinkNode);
        const hyperlinkNode = node as HyperlinkNode;
        expect(hyperlinkNode.text).toBeInstanceOf(ItalicNode);
        const italicNode = hyperlinkNode.text as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("hello");
        expect(hyperlinkNode.url).toBe("world");
      });

      it("test with nested strikethrough", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBracket,
            value: "[",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeBracket,
            value: "]",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openParen,
            value: "(",
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
            type: Tokens.closeParen,
            value: ")",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HyperlinkNode);
        const hyperlinkNode = node as HyperlinkNode;
        expect(hyperlinkNode.text).toBeInstanceOf(StrikethroughNode);
        const italicNode = hyperlinkNode.text as ItalicNode;
        expect(italicNode.text).toBeInstanceOf(TextWrapperNode);
        expect((italicNode.text as TextWrapperNode).text).toBe("hello");
        expect(hyperlinkNode.url).toBe("world");
      });

      it("test dollar symbol", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.openBracket,
            value: "[",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.dollar,
            value: "$copy",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeBracket,
            value: "]",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.openParen,
            value: "(",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.dollar,
            value: "$copy",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.closeParen,
            value: ")",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HyperlinkNode);
        const hyperlinkNode = node as HyperlinkNode;
        expect(hyperlinkNode.text).toBeInstanceOf(TextWrapperNode);
        expect((hyperlinkNode.text as TextWrapperNode).text).toBe("©");
        expect(hyperlinkNode.url).toBe("©");
      });
    });

    describe("formula", () => {
      it("test formula with no arguments", () => {
        const tokens = createTokenStream([
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$test",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$",
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(FormulaNode);
        const formulaNode = node as FormulaNode;

        expect(formulaNode.name).toEqual("test");
        expect(formulaNode.args).toHaveLength(0);
      });

      it("test formula with single argument", () => {
        const tokens = createTokenStream([
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$test",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.openBrace,
            value: "{",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.passthrough,
            value: "hello",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.closeBrace,
            value: "}",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$",
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(FormulaNode);
        const formulaNode = node as FormulaNode;

        expect(formulaNode.name).toEqual("test");
        expect(formulaNode.args).toHaveLength(1);
        expect(formulaNode.json()).toEqual({
          args: [
            {
              text: {
                text: "hello",
                type: "text",
              },
              type: "argument",
            },
          ],
          name: "test",
          type: "formula",
        });
      });

      it("test formula with multiple arguments", () => {
        const tokens = createTokenStream([
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$test",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.openBrace,
            value: "{",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.passthrough,
            value: "hello",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.closeBrace,
            value: "}",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.openBrace,
            value: "{",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.passthrough,
            value: "world",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.closeBrace,
            value: "}",
          },
          {
            col: 1,
            index: 0,
            line: 1,
            type: Tokens.doubleDollar,
            value: "$$",
          },
        ]);

        const parser = new Parser(tokens);
        const node = parser.parseTextBasedNode();

        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(FormulaNode);
        const formulaNode = node as FormulaNode;

        expect(formulaNode.name).toEqual("test");
        expect(formulaNode.args).toHaveLength(2);

        expect(formulaNode.json()).toEqual({
          args: [
            {
              text: {
                text: "hello",
                type: "text",
              },
              type: "argument",
            },
            {
              text: {
                text: "world",
                type: "text",
              },
              type: "argument",
            },
          ],
          name: "test",
          type: "formula",
        });
      });
    });
  });

  describe("parseNode", () => {
    describe("heading", () => {
      it("should parse heading", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.heading,
            value: "#",
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
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HeadingNode);
        expect(((node as HeadingNode).text as TextWrapperNode).text).toEqual(
          "hello"
        );
      });

      it("should parse heading with newline", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.heading,
            value: "#",
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
            type: Tokens.newline,
            value: "\n",
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
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HeadingNode);
        expect(((node as HeadingNode).text as TextWrapperNode).text).toEqual(
          "hello"
        );
      });

      it("should parse heading with bold content", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.heading,
            value: "#",
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
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HeadingNode);
        expect((node as HeadingNode).text).toBeInstanceOf(BoldNode);
        expect(
          (((node as HeadingNode).text as BoldNode).text as TextWrapperNode)
            .text
        ).toEqual("hello");
      });

      it("should parse heading with italic content", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.heading,
            value: "#",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HeadingNode);
        expect((node as HeadingNode).text).toBeInstanceOf(ItalicNode);
        expect(
          (((node as HeadingNode).text as ItalicNode).text as TextWrapperNode)
            .text
        ).toEqual("hello");
      });

      it("should parse heading with strikethrough content", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.heading,
            value: "#",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(HeadingNode);
        expect((node as HeadingNode).text).toBeInstanceOf(StrikethroughNode);
        expect(
          (
            ((node as HeadingNode).text as StrikethroughNode)
              .text as TextWrapperNode
          ).text
        ).toEqual("hello");
      });
    });

    describe("paragraph", () => {
      it("should parse paragraph", () => {
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
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ParagraphNode);
        expect(((node as ParagraphNode).text as TextWrapperNode).text).toEqual(
          "hello"
        );
      });

      it("should parse paragraph with newline", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.passthrough,
            value: "hello",
            line: 1,
            col: 1,
            index: 0,
          },
          {
            type: Tokens.newline,
            value: "\n",
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
        ]);
        const parser = new Parser(tokens);
        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ParagraphNode);
        expect(((node as ParagraphNode).text as TextWrapperNode).text).toEqual(
          "hello"
        );
      });

      it("should parse paragraph with bold content", () => {
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

        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ParagraphNode);
        expect((node as ParagraphNode).text).toBeInstanceOf(BoldNode);
        expect(
          (((node as ParagraphNode).text as BoldNode).text as TextWrapperNode)
            .text
        ).toEqual("hello");
      });

      it("should parse paragraph with italic content", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.asterisk,
            value: "*",
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
            type: Tokens.asterisk,
            value: "*",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);

        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ParagraphNode);
        expect((node as ParagraphNode).text).toBeInstanceOf(ItalicNode);
        expect(
          (((node as ParagraphNode).text as ItalicNode).text as TextWrapperNode)
            .text
        ).toEqual("hello");
      });

      it("should parse paragraph with strikethrough content", () => {
        const tokens = createTokenStream([
          {
            type: Tokens.tilde,
            value: "~",
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
            type: Tokens.tilde,
            value: "~",
            line: 1,
            col: 1,
            index: 0,
          },
        ]);
        const parser = new Parser(tokens);

        const node = parser.parseNode();
        expect(node).toBeDefined();
        expect(node).toBeInstanceOf(ParagraphNode);
        expect((node as ParagraphNode).text).toBeInstanceOf(StrikethroughNode);
        expect(
          (
            ((node as ParagraphNode).text as StrikethroughNode)
              .text as TextWrapperNode
          ).text
        ).toEqual("hello");
      });
    });
  });

  describe("parse", () => {
    it("should parse empty document", () => {
      const tokens = createTokenStream([]);
      const parser = new Parser(tokens);
      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [],
      });
    });

    it("heading", () => {
      const tokens = createTokenStream([
        {
          type: Tokens.heading,
          value: "#",
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
      ]);
      const parser = new Parser(tokens);
      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "heading",
            level: 1,
            text: {
              type: "text",
              text: "hello",
            },
          },
        ],
      });
    });

    it("paragraph", () => {
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
      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "text",
              text: "hello",
            },
          },
        ],
      });
    });

    it("paragraph with newline", () => {
      const tokens = createTokenStream([
        {
          type: Tokens.passthrough,
          value: "hello",
          line: 1,
          col: 1,
          index: 0,
        },
        {
          type: Tokens.newline,
          value: "\n",
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
      ]);
      const parser = new Parser(tokens);
      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "text",
              text: "hello",
            },
          },
          {
            type: "paragraph",
            text: {
              type: "text",
              text: "hello",
            },
          },
        ],
      });
    });

    it("paragraph with bold content", () => {
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

      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "bold",
              text: {
                type: "text",
                text: "hello",
              },
            },
          },
        ],
      });
    });

    it("paragraph with italic content", () => {
      const tokens = createTokenStream([
        {
          type: Tokens.asterisk,
          value: "*",
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
          type: Tokens.asterisk,
          value: "*",
          line: 1,
          col: 1,
          index: 0,
        },
      ]);
      const parser = new Parser(tokens);

      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "italic",
              text: {
                type: "text",
                text: "hello",
              },
            },
          },
        ],
      });
    });

    it("paragraph with strikethrough content", () => {
      const tokens = createTokenStream([
        {
          type: Tokens.tilde,
          value: "~",
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
          type: Tokens.tilde,
          value: "~",
          line: 1,
          col: 1,
          index: 0,
        },
      ]);
      const parser = new Parser(tokens);

      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "strikethrough",
              text: {
                type: "text",
                text: "hello",
              },
            },
          },
        ],
      });
    });

    it("paragraph with hyperlink", () => {
      const tokens = createTokenStream([
        {
          type: Tokens.openBracket,
          value: "[",
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
          type: Tokens.closeBracket,
          value: "]",
          line: 1,
          col: 1,
          index: 0,
        },
        {
          type: Tokens.openParen,
          value: "(",
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
          type: Tokens.closeParen,
          value: ")",
          line: 1,
          col: 1,
          index: 0,
        },
      ]);
      const parser = new Parser(tokens);

      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "hyperlink",
              text: {
                type: "text",
                text: "hello",
              },
              url: "world",
            },
          },
        ],
      });
    });

    it("paragraph with nested hyperlink", () => {
      const tokens = createTokenStream([
        {
          type: Tokens.openBracket,
          value: "[",
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
        {
          type: Tokens.closeBracket,
          value: "]",
          line: 1,
          col: 1,
          index: 0,
        },
        {
          type: Tokens.openParen,
          value: "(",
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
          type: Tokens.closeParen,
          value: ")",
          line: 1,
          col: 1,
          index: 0,
        },
      ]);
      const parser = new Parser(tokens);

      const node = parser.parse();
      expect(node).toBeDefined();
      expect(node.json()).toEqual({
        type: "document",
        children: [
          {
            type: "paragraph",
            text: {
              type: "hyperlink",
              text: {
                type: "bold",
                text: {
                  type: "text",
                  text: "hello",
                },
              },
              url: "world",
            },
          },
        ],
      });
    });
  });
});
