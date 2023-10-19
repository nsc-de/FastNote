export abstract class Node {
  constructor() {}
  abstract json(): unknown;
}

export class Tree extends Node {
  constructor(public readonly children: Node[]) {
    super();
  }
  json(): unknown {
    return { children: this.children.map((c) => c.json()), type: "document" };
  }
}

export abstract class CharacterNode extends Node {
  constructor() {
    super();
  }
  abstract get value(): string;
  abstract get code(): string;
  abstract json(): unknown;
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

  json() {
    return {
      type: "text",
      text: this.text,
    };
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

  json() {
    return {
      type: "bold",
      text: this.text.json(),
    };
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

  json() {
    return {
      type: "italic",
      text: this.text.json(),
    };
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

  json() {
    return {
      type: "underline",
      text: this.text.json(),
    };
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

  json() {
    return {
      type: "strikethrough",
      text: this.text.json(),
    };
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

  json() {
    return {
      type: "join",
      text: this.text.map((t) => t.json()),
    };
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

  json() {
    return {
      type: "hyperlink",
      text: this.text.json(),
      url: this.url,
    };
  }
}

export class ParagraphNode extends Node {
  readonly type = "paragraph";
  constructor(readonly text: CharacterNode) {
    super();
  }

  json() {
    return {
      type: "paragraph",
      text: this.text.json(),
    };
  }
}

export class HeadingNode extends Node {
  readonly type = "heading";
  constructor(readonly level: number, readonly text: CharacterNode) {
    super();
  }

  json() {
    return {
      type: "heading",
      level: this.level,
      text: this.text.json(),
    };
  }
}

export class ArgumentNode extends CharacterNode {
  readonly type = "argument";
  constructor(readonly text: CharacterNode) {
    super();
  }

  json() {
    return {
      type: "argument",
      text: this.text.json(),
    };
  }
  get value(): string {
    return `{${this.text.value}}`;
  }
  get code(): string {
    return `{${this.text.code}}`;
  }
}

export class FormulaNode extends CharacterNode {
  readonly type = "formula";
  constructor(readonly name: string, readonly args: ArgumentNode[]) {
    super();
  }
  json(): unknown {
    return {
      type: "formula",
      name: this.name,
      args: this.args.map((a) => a.json()),
    };
  }

  get value(): string {
    return this.name + this.args.map((a) => a.value).join("");
  }
  get code(): string {
    return this.name + this.args.map((a) => a.code).join("");
  }
}
