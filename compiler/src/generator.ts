import {
  ArgumentNode,
  BoldNode,
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

export abstract class Generator<T> {
  generate(node: Node): T {
    if (node instanceof Tree) return this.generateTree(node);
    if (node instanceof TextWrapperNode)
      return this.generateTextWrapperNode(node);
    if (node instanceof BoldNode) return this.generateBold(node);
    if (node instanceof ItalicNode) return this.generateItalic(node);
    if (node instanceof UnderlineNode) return this.generateUnderline(node);
    if (node instanceof StrikethroughNode)
      return this.generateStrikethrough(node);
    if (node instanceof JoinNode) return this.generateJoin(node);
    if (node instanceof HyperlinkNode) return this.generateHyperlink(node);
    if (node instanceof ParagraphNode) return this.generateParagraph(node);
    if (node instanceof HeadingNode) return this.generateHeading(node);
    if (node instanceof ArgumentNode) return this.generateArgument(node);
    if (node instanceof FormulaNode) return this.generateFormula(node);
    throw new Error("Unknown node type");
  }

  abstract generateTree(node: Tree): T;
  abstract generateTextWrapperNode(node: TextWrapperNode): T;
  abstract generateBold(node: BoldNode): T;
  abstract generateItalic(node: ItalicNode): T;
  abstract generateUnderline(node: UnderlineNode): T;
  abstract generateStrikethrough(node: StrikethroughNode): T;
  abstract generateJoin(node: JoinNode): T;
  abstract generateHyperlink(node: HyperlinkNode): T;
  abstract generateParagraph(node: ParagraphNode): T;
  abstract generateHeading(node: HeadingNode): T;
  abstract generateArgument(node: ArgumentNode): T;
  abstract generateFormula(node: FormulaNode): T;
}

export default Generator;
