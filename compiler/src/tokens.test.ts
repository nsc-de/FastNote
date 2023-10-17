import { Tokens, createTokenStream } from "./tokens";

describe("createTokenStream", () => {
  it("should return a token stream", () => {
    const stream = createTokenStream([]);
  });

  it("should be eof if empty", () => {
    const stream = createTokenStream([]);
    expect(stream.eof()).toBe(true);
  });

  it("should not be eof if not empty", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
    ]);
    expect(stream.eof()).toBe(false);
  });

  it("should be eof after reading all tokens", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
    ]);
    stream.next();
    expect(stream.eof()).toBe(true);
  });

  it("should return the next token", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
    ]);
    expect(stream.next()).toEqual({
      type: Tokens.string,
      value: "",
      line: 0,
      col: 0,
      index: 0,
    });
  });

  it("should return the next token after reading", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
    ]);
    stream.next();
    expect(stream.next()).toEqual({
      type: Tokens.string,
      value: "",
      line: 0,
      col: 0,
      index: 0,
    });
  });

  it("peek should return the next token without advancing", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
    ]);
    expect(stream.peek()).toEqual({
      type: Tokens.string,
      value: "",
      line: 0,
      col: 0,
      index: 0,
    });
    expect(stream.peek()).toEqual({
      type: Tokens.string,
      value: "",
      line: 0,
      col: 0,
      index: 0,
    });
  });

  it("check index", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
      { type: Tokens.string, value: "", line: 0, col: 0, index: 0 },
    ]);
    expect(stream.index).toBe(0);
    stream.next();
    expect(stream.index).toBe(1);
    stream.next();
    expect(stream.index).toBe(2);
  });

  it("check line", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: "", line: 1, col: 0, index: 0 },
      { type: Tokens.string, value: "", line: 1, col: 0, index: 0 },
      { type: Tokens.string, value: "", line: 2, col: 0, index: 0 },
    ]);
    expect(stream.line).toBe(1);
    stream.next();
    expect(stream.line).toBe(1);
    stream.next();
    expect(stream.line).toBe(1);
    stream.next();
    expect(stream.line).toBe(2);
  });

  it("check col", () => {
    const stream = createTokenStream([
      { type: Tokens.string, value: " ", line: 0, col: 1, index: 0 },
      { type: Tokens.string, value: " ", line: 0, col: 2, index: 0 },
      { type: Tokens.string, value: " ", line: 0, col: 3, index: 0 },
    ]);

    expect(stream.col).toBe(0);
    stream.next();
    expect(stream.col).toBe(1);
    stream.next();
    expect(stream.col).toBe(2);
    stream.next();
    expect(stream.col).toBe(3);
  });
});
