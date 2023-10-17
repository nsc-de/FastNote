import { createCharacterInputStream } from "./characters";

describe("createCharacterInputStream", () => {
  describe("construct", () => {
    it("should return a token stream", () => {
      createCharacterInputStream("");
    });
  });
  it("should be eof if empty", () => {
    const stream = createCharacterInputStream("");
    expect(stream.eof()).toBe(true);
  });

  it("should not be eof if not empty", () => {
    const stream = createCharacterInputStream("a");
    expect(stream.eof()).toBe(false);
  });

  it("should be eof after reading all characters", () => {
    const stream = createCharacterInputStream("a");
    stream.next();
    expect(stream.eof()).toBe(true);
  });

  it("should return the next character", () => {
    const stream = createCharacterInputStream("a");
    expect(stream.next()).toBe("a");
  });

  it("should return the next character after reading", () => {
    const stream = createCharacterInputStream("ab");
    stream.next();
    expect(stream.next()).toBe("b");
  });

  it("peek should return the next character without advancing", () => {
    const stream = createCharacterInputStream("ab");
    expect(stream.peek()).toBe("a");
    expect(stream.peek()).toBe("a");
  });

  it("check index", () => {
    const stream = createCharacterInputStream("ab");
    expect(stream.index).toBe(0);
    stream.next();
    expect(stream.index).toBe(1);
    stream.next();
    expect(stream.index).toBe(2);
  });

  it("check line", () => {
    const stream = createCharacterInputStream("a\nb");
    expect(stream.line).toBe(1);
    stream.next();
    expect(stream.line).toBe(1);
    stream.next();
    expect(stream.line).toBe(2);
  });

  it("check col", () => {
    const stream = createCharacterInputStream("ab");
    expect(stream.col).toBe(1);
    stream.next();
    expect(stream.col).toBe(2);
    stream.next();
    expect(stream.col).toBe(3);
  });
});
