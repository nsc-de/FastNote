// readline

import { createInterface } from "readline";
import { createCharacterInputStream } from "./characters";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { LatexGenerator } from "./latex";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your code to compile: ", (answer) => {
  const input = createCharacterInputStream(answer);
  const lexer = new Lexer(input);
  const parser = new Parser(lexer.stream());
  const latex = new LatexGenerator().generate(parser.parse());
  console.log(`http://localhost:3000/formula/${btoa(latex)}/svg`);

  rl.close();
});
