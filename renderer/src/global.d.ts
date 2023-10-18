declare module "mathjax-node" {
  function start(): void;

  interface TypesetInput {
    math: string;
    format: string;
    svg?: boolean;
    html?: boolean;
  }

  interface TypesetOutput {
    errors: any; // You may need to define a more specific type for errors
    svg?: string;
    html?: string;
    css?: string;
  }

  function typeset(
    input: TypesetInput,
    callback: (data: TypesetOutput) => void
  ): void;
}
