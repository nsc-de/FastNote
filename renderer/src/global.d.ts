declare module "mathjax-node" {
  function start(): void;

  interface TypesetInput {
    math: string;
    format: string;
    svg?: boolean;
    html?: boolean;
  }

  interface TypesetOutput {
    errors: unknown;
    svg?: string;
    html?: string;
    css?: string;
  }

  function typeset(
    input: TypesetInput,
    callback: (data: TypesetOutput) => void
  ): void;
}
