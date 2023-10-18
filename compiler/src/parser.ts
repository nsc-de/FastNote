import dollarShortcuts from "./dollar-shortcuts";
import { TokenStream, Tokens } from "./tokens";

export class Parser {
  constructor(private readonly tokens: TokenStream) {}

  parse(): Tree {
    const children: Node[] = [];
    while (!this.tokens.eof()) {
      children.push(this.parseNode());
    }
    return new Tree(children);
  }

  parseNode(): Node {
    switch (this.tokens.peek().type) {
      case Tokens.heading:
        return this.parseHeadingNode();
      default:
        return this.parseParagraphNode();
    }
  }

  parseTextWrapperNode(): TextWrapperNode {
    const tokens = [this.tokens.next()];
    while (this.tokens.peek()?.type === Tokens.passthrough) {
      tokens.push(this.tokens.next());
    }
    return new TextWrapperNode(tokens.map((t) => t.value).join(""));
  }

  parseBoldNode(): BoldNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start.type !== this.tokens.peek().type)
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new BoldNode(
      children.length === 1
        ? children[0]
        : children.length === 0
        ? new TextWrapperNode("")
        : new JoinNode(children)
    );
  }

  parseItalicNode(): ItalicNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start.type !== this.tokens.peek().type)
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new ItalicNode(
      children.length === 1
        ? children[0]
        : children.length === 0
        ? new TextWrapperNode("")
        : new JoinNode(children)
    );
  }

  parseUnderlineNode(): UnderlineNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start !== this.tokens.peek())
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new UnderlineNode(
      children.length === 1
        ? children[0]
        : children.length === 0
        ? new TextWrapperNode("")
        : new JoinNode(children)
    );
  }

  parseStrikethroughNode(): StrikethroughNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start.type !== this.tokens.peek().type)
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new StrikethroughNode(
      children.length === 1
        ? children[0]
        : children.length === 0
        ? new TextWrapperNode("")
        : new JoinNode(children)
    );
  }

  parseHyperlinkNode(): HyperlinkNode {
    const start = this.tokens.next();

    if (start.type !== Tokens.openBracket) throw new Error("Expected [");

    const alt: CharacterNode[] = [];
    while (
      !this.tokens.eof() &&
      this.tokens.peek().type !== Tokens.closeBracket
    )
      alt.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    if (this.tokens.peek().type !== Tokens.openParen)
      throw new Error("Expected (");

    this.tokens.next();

    const href: CharacterNode[] = [];

    while (!this.tokens.eof() && this.tokens.peek().type !== Tokens.closeParen)
      href.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new HyperlinkNode(
      alt.length === 1
        ? alt[0]
        : alt.length === 0
        ? new TextWrapperNode("")
        : new JoinNode(alt),
      new JoinNode(href).code
    );
  }

  parseTextBasedNode(): CharacterNode {
    switch (this.tokens.peek().type) {
      case Tokens.openBracket:
        return this.parseHyperlinkNode();
      case Tokens.dollar:
        return this.parseDollarNode();
      case Tokens.exponent:
        return this.parseBoldNode();
      case Tokens.asterisk:
        return this.parseItalicNode();
      //    case Tokens.identifier: // _ is in identifier, fix this
      //      return this.parseUnderlineNode();
      case Tokens.tilde:
        return this.parseStrikethroughNode();
      default:
        return this.parseTextWrapperNode();
    }
  }

  parseParagraphNode(): ParagraphNode {
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && this.tokens.peek().type !== Tokens.newline)
      children.push(this.parseTextBasedNode());

    return new ParagraphNode(
      children.length === 1 ? children[0] : new JoinNode(children)
    );
  }

  parseDollarNode(): CharacterNode {
    const token = this.tokens.next();
    if (token.type !== Tokens.dollar) throw new Error("Expected dollar");
    const name = token.value.substring(1);
    return new TextWrapperNode(
      dollarShortcuts.find((d) => d.name === name)?.value ?? `$${token.value}`
    );
  }

  parseHeadingNode(): HeadingNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && this.tokens.peek().type !== Tokens.newline)
      children.push(this.parseTextBasedNode());

    return new HeadingNode(
      start.value.length,
      children.length === 1 ? children[0] : new JoinNode(children)
    );
  }
}

export abstract class Node {
  constructor() {}
}

export class Tree {
  readonly type = "tree";
  constructor(public readonly children: Node[]) {}
}

export abstract class CharacterNode {
  constructor() {}
  abstract get value(): string;
  abstract get code(): string;
}

export class TextWrapperNode extends CharacterNode {
  readonly type = "text";
  constructor(readonly text: string) {
    super();
  }

  get value() {
    return this.text;
  }

  get code() {
    return this.text;
  }
}

export class BoldNode extends CharacterNode {
  readonly type = "bold";
  constructor(readonly text: CharacterNode) {
    super();
  }

  get value() {
    return this.text.value;
  }

  get code() {
    return `**${this.text.code}**`;
  }
}

export class ItalicNode extends CharacterNode {
  readonly type = "italic";
  constructor(readonly text: CharacterNode) {
    super();
  }

  get value() {
    return this.text.value;
  }

  get code() {
    return `*${this.text.code}*`;
  }
}

export class UnderlineNode extends CharacterNode {
  readonly type = "underline";
  constructor(readonly text: CharacterNode) {
    super();
  }

  get value() {
    return this.text.value;
  }

  get code() {
    return `_${this.text.code}_`;
  }
}

export class StrikethroughNode extends CharacterNode {
  readonly type = "strikethrough";
  constructor(readonly text: CharacterNode) {
    super();
  }

  get value() {
    return this.text.value;
  }

  get code() {
    return `~~${this.text.code}~~`;
  }
}

export class JoinNode extends CharacterNode {
  readonly type = "join";
  constructor(readonly text: CharacterNode[]) {
    super();
  }

  get value() {
    return this.text.map((t) => t.value).join("");
  }

  get code() {
    return this.text.map((t) => t.code).join("");
  }
}

export class HyperlinkNode extends CharacterNode {
  readonly type = "hyperlink";
  constructor(readonly text: CharacterNode, readonly url: string) {
    super();
  }

  get value() {
    return this.text.value;
  }

  get code() {
    return `[${this.text.code}](${this.url})`;
  }
}

export class ParagraphNode extends Node {
  readonly type = "paragraph";
  constructor(readonly text: CharacterNode) {
    super();
  }
}

export class HeadingNode extends Node {
  readonly type = "heading";
  constructor(readonly level: number, readonly text: CharacterNode) {
    super();
  }
}
