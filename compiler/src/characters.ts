// Character input stream

export interface CharacterInputStream {
  readonly index: number;
  readonly line: number;
  readonly col: number;

  peek(): string;
  next(): string;
  eof(): boolean;
}

export function createCharacterInputStream(
  input: string
): CharacterInputStream {
  let index = 0;
  let line = 1;
  let col = 1;

  return {
    get index() {
      return index;
    },
    get line() {
      return line;
    },
    get col() {
      return col;
    },

    peek() {
      return input.charAt(index);
    },

    next() {
      const char = input.charAt(index++);
      if (char === "\n") {
        line++;
        col = 1;
      } else {
        col++;
      }
      return char;
    },

    eof() {
      return index >= input.length;
    },
  };
}
