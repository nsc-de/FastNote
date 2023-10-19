import dollarShortcuts from "./dollar-shortcuts";
import {
  ArgumentNode,
  BoldNode,
  CharacterNode,
  FormulaNode,
  HeadingNode,
  HyperlinkNode,
  ItalicNode,
  JoinNode,
  Node,
  ParagraphNode,
  StrikethroughNode,
  TextWrapperNode,
  Tree,
  UnderlineNode,
} from "./nodes";
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

    return new BoldNode(join(children));
  }

  parseItalicNode(): ItalicNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start.type !== this.tokens.peek().type)
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new ItalicNode(join(children));
  }

  parseUnderlineNode(): UnderlineNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start !== this.tokens.peek())
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new UnderlineNode(join(children));
  }

  parseStrikethroughNode(): StrikethroughNode {
    const start = this.tokens.next();
    const children: CharacterNode[] = [];
    while (!this.tokens.eof() && start.type !== this.tokens.peek().type)
      children.push(this.parseTextBasedNode());

    if (!this.tokens.eof()) this.tokens.next();

    return new StrikethroughNode(join(children));
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

    return new HyperlinkNode(join(alt), join(href).code);
  }

  parseTextBasedNode(): CharacterNode {
    switch (this.tokens.peek().type) {
      case Tokens.openBracket:
        return this.parseHyperlinkNode();
      case Tokens.dollar:
        return this.parseDollarNode();
      case Tokens.doubleDollar:
        return this.parseFormulaNode();
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

    if (!this.tokens.eof()) this.tokens.next();

    return new ParagraphNode(join(children));
  }

  parseDollarNode(): CharacterNode {
    const token = this.tokens.next();
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

    if (!this.tokens.eof()) this.tokens.next();

    return new HeadingNode(start.value.length, join(children));
  }

  parseFormulaNode(): FormulaNode {
    const start = this.tokens.next();

    const name = start.value.substring(2);

    const args: ArgumentNode[] = [];

    while (!this.tokens.eof() && this.tokens.peek().type === Tokens.openBrace) {
      args.push(this.parseArgumentNode());
    }

    if (
      !this.tokens.eof() &&
      this.tokens.peek()?.type === Tokens.doubleDollar
    ) {
      this.tokens.next();
    }

    return new FormulaNode(name, args);
  }

  parseArgumentNode(): ArgumentNode {
    this.tokens.next();

    const children: CharacterNode[] = [];

    while (
      !this.tokens.eof() &&
      this.tokens.peek().type !== Tokens.closeBrace
    ) {
      children.push(this.parseTextBasedNode());
    }

    if (!this.tokens.eof()) this.tokens.next();

    return new ArgumentNode(join(children));
  }
}

function join(nodes: CharacterNode[]) {
  return nodes.length === 1
    ? nodes[0]
    : nodes.length === 0
    ? new TextWrapperNode("")
    : new JoinNode(nodes);
}
