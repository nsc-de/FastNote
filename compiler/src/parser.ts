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

  parseTextBasedNode(): CharacterNode {
    switch (this.tokens.peek().type) {
      case Tokens.exponent:
        return this.parseBoldNode();
      case Tokens.asterisk:
        return this.parseItalicNode();
      //    case Tokens.identifier: // _ is in identifier, fix this
      //      return this.parseUnderlineNode();
      case Tokens.minus:
        return this.parseStrikethroughNode();
      default:
        return this.parseTextWrapperNode();
    }
  }

  parseParagraphNode(): ParagraphNode {
    const children: CharacterNode[] = [];
    while (!this.tokens.eof()) {
      children.push(this.parseTextBasedNode());
    }
    return new ParagraphNode(
      children.length === 1 ? children[0] : new JoinNode(children)
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
}

export class TextWrapperNode extends CharacterNode {
  readonly type = "text";
  constructor(readonly text: string) {
    super();
  }
}

export class BoldNode extends CharacterNode {
  readonly type = "bold";
  constructor(readonly text: CharacterNode) {
    super();
  }
}

export class ItalicNode extends CharacterNode {
  readonly type = "italic";
  constructor(readonly text: CharacterNode) {
    super();
  }
}

export class UnderlineNode extends CharacterNode {
  readonly type = "underline";
  constructor(readonly text: CharacterNode) {
    super();
  }
}

export class StrikethroughNode extends CharacterNode {
  readonly type = "strikethrough";
  constructor(readonly text: CharacterNode) {
    super();
  }
}

export class JoinNode extends CharacterNode {
  readonly type = "join";
  constructor(readonly text: CharacterNode[]) {
    super();
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
