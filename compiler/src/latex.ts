import Generator from "./generator";
import {
  Tree,
  BoldNode,
  ItalicNode,
  UnderlineNode,
  StrikethroughNode,
  JoinNode,
  HyperlinkNode,
  ParagraphNode,
  HeadingNode,
  ArgumentNode,
  FormulaNode,
  TextWrapperNode,
} from "./nodes";

export class LatexGenerator extends Generator<string> {
  generateTree(node: Tree): string {
    return node.children.map((child) => this.generate(child)).join("");
  }

  generateTextWrapperNode(node: TextWrapperNode): string {
    return node.text;
  }

  generateBold(node: BoldNode): string {
    return `\\textbf{${this.generate(node.text)}}`;
  }

  generateItalic(node: ItalicNode): string {
    return `\\textit{${this.generate(node.text)}}`;
  }

  generateUnderline(node: UnderlineNode): string {
    return `\\underline{${this.generate(node.text)}}`;
  }

  generateStrikethrough(node: StrikethroughNode): string {
    return `\\sout{${this.generate(node.text)}}`;
  }

  generateJoin(node: JoinNode): string {
    return node.text.map((child) => this.generate(child)).join("");
  }

  generateHyperlink(node: HyperlinkNode): string {
    return `\\href{${node.url}}{${this.generate(node.text)}}`;
  }

  generateParagraph(node: ParagraphNode): string {
    return `${this.generate(node.text)}\n\n`;
  }

  generateHeading(node: HeadingNode): string {
    return `\\${"sub".repeat(node.level - 1)}section{${this.generate(
      node.text
    )}}`;
  }

  generateArgument(node: ArgumentNode): string {
    return this.generate(node.text);
  }

  generateFormula(node: FormulaNode): string {
    switch (node.name) {
      case "frac":
        return this.generateFrac(node.args);
      case "sqrt":
        return this.generateSqrt(node.args);
      case "sum":
        return this.generateSum(node.args);
      default:
        throw new Error("Unknown formula type");
    }
  }

  private generateSum(args: ArgumentNode[]): string {
    if (args.length === 2)
      return `\\sum_{${this.generate(args[0])}}^{${this.generate(args[1])}}`;
    else if (args.length === 1) return `\\sum_{${this.generate(args[0])}}`;
    else if (args.length === 3)
      return `\\sum_{${this.generate(args[0])}}^{${this.generate(
        args[1]
      )}}{${this.generate(args[2])}}`;
    else throw new Error("Invalid number of arguments for sum");
  }

  private generateFrac(args: ArgumentNode[]): string {
    if (args.length === 2)
      return `\\frac{${this.generate(args[0])}}{${this.generate(args[1])}}`;
    else throw new Error("Invalid number of arguments for frac");
  }

  private generateSqrt(args: ArgumentNode[]): string {
    if (args.length === 1) return `\\sqrt{${this.generate(args[0])}}`;
    else throw new Error("Invalid number of arguments for sqrt");
  }
}
