import { LatexGenerator } from "./latex";
import {
  ArgumentNode,
  BoldNode,
  FormulaNode,
  HeadingNode,
  HyperlinkNode,
  ItalicNode,
  JoinNode,
  ParagraphNode,
  StrikethroughNode,
  TextWrapperNode,
  Tree,
  UnderlineNode,
} from "./nodes";

describe("LatexGenerator", () => {
  describe("generateTree", () => {
    it("should generate a tree", () => {
      const generator = new LatexGenerator();

      const result = generator.generateTree(new Tree([]));

      expect(result).toEqual("");
    });
  });

  describe("generateTextWrapperNode", () => {
    it("should generate text wrapper node", () => {
      const generator = new LatexGenerator();

      const result = generator.generateTextWrapperNode(
        new TextWrapperNode("Hello World!")
      );

      expect(result).toEqual("Hello World!");
    });
  });

  describe("generateBold", () => {
    it("should generate bold text", () => {
      const generator = new LatexGenerator();

      const result = generator.generateBold(
        new BoldNode(new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\textbf{Hello World!}");
    });
  });

  describe("generateItalic", () => {
    it("should generate italic text", () => {
      const generator = new LatexGenerator();

      const result = generator.generateItalic(
        new ItalicNode(new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\textit{Hello World!}");
    });
  });

  describe("generateUnderline", () => {
    it("should generate underline text", () => {
      const generator = new LatexGenerator();

      const result = generator.generateUnderline(
        new UnderlineNode(new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\underline{Hello World!}");
    });
  });

  describe("generateStrikethrough", () => {
    it("should generate strikethrough text", () => {
      const generator = new LatexGenerator();

      const result = generator.generateStrikethrough(
        new StrikethroughNode(new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\sout{Hello World!}");
    });
  });

  describe("generateJoin", () => {
    it("should generate joined text", () => {
      const generator = new LatexGenerator();

      const result = generator.generateJoin(
        new JoinNode([
          new TextWrapperNode("Hello "),
          new TextWrapperNode("World!"),
        ])
      );

      expect(result).toEqual("Hello World!");
    });
  });

  describe("generateHyperlink", () => {
    it("should generate a hyperlink", () => {
      const generator = new LatexGenerator();

      const result = generator.generateHyperlink(
        new HyperlinkNode(
          new TextWrapperNode("Hello World!"),
          "https://example.com"
        )
      );

      expect(result).toEqual("\\href{https://example.com}{Hello World!}");
    });
  });

  describe("generateParagraph", () => {
    it("should generate a paragraph", () => {
      const generator = new LatexGenerator();

      const result = generator.generateParagraph(
        new ParagraphNode(new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("Hello World!\n\n");
    });
  });

  describe("generateHeading", () => {
    it("should generate a heading", () => {
      const generator = new LatexGenerator();

      const result = generator.generateHeading(
        new HeadingNode(1, new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\section{Hello World!}");
    });

    it("should generate a subheading", () => {
      const generator = new LatexGenerator();

      const result = generator.generateHeading(
        new HeadingNode(2, new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\subsection{Hello World!}");
    });

    it("should generate a subsubheading", () => {
      const generator = new LatexGenerator();

      const result = generator.generateHeading(
        new HeadingNode(3, new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("\\subsubsection{Hello World!}");
    });
  });

  describe("generateArgument", () => {
    it("should generate an argument", () => {
      const generator = new LatexGenerator();

      const result = generator.generateArgument(
        new ArgumentNode(new TextWrapperNode("Hello World!"))
      );

      expect(result).toEqual("Hello World!");
    });
  });

  describe("generateFormula", () => {
    it("should generate a sqrt", () => {
      const generator = new LatexGenerator();

      const result = generator.generateFormula(
        new FormulaNode("sqrt", [
          new ArgumentNode(new TextWrapperNode("Hello World!")),
        ])
      );

      expect(result).toEqual("\\sqrt{Hello World!}");
    });

    it("should generate a frac", () => {
      const generator = new LatexGenerator();

      const result = generator.generateFormula(
        new FormulaNode("frac", [
          new ArgumentNode(new TextWrapperNode("Hello World!")),
          new ArgumentNode(new TextWrapperNode("Hello World!")),
        ])
      );

      expect(result).toEqual("\\frac{Hello World!}{Hello World!}");
    });

    it("should generate a 3 part sum", () => {
      const generator = new LatexGenerator();

      const result = generator.generateFormula(
        new FormulaNode("sum", [
          new ArgumentNode(new TextWrapperNode("Hello World!")),
          new ArgumentNode(new TextWrapperNode("Hello World!")),
          new ArgumentNode(new TextWrapperNode("Hello World!")),
        ])
      );

      expect(result).toEqual(
        "\\sum_{Hello World!}^{Hello World!}{Hello World!}"
      );
    });

    it("should generate a 2 part sum", () => {
      const generator = new LatexGenerator();

      const result = generator.generateFormula(
        new FormulaNode("sum", [
          new ArgumentNode(new TextWrapperNode("Hello World!")),
          new ArgumentNode(new TextWrapperNode("Hello World!")),
        ])
      );

      expect(result).toEqual("\\sum_{Hello World!}^{Hello World!}");
    });
  });
});
