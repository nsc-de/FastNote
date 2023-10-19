import { Cache, get_helper, multilayer_get_helper, searchTree } from "./cache";
import tmp from "tmp";

describe("helpers", () => {
  describe("get_helper", () => {
    it("should get a value from a single layer", () => {
      const obj = { a: 1 };
      let result = 0;
      get_helper("a", obj, (obj, subpath) => {
        expect(subpath).toEqual("");
        result = obj;
      });

      expect(result).toEqual(1);
      expect(obj).toEqual({ a: 1 });
    });

    it("should set a value from a single layer", () => {
      const obj = { a: 1 };
      let result = 0;
      get_helper("a", obj, (obj, subpath) => {
        expect(subpath).toEqual("");
        return (result = obj + 1);
      });

      expect(result).toEqual(2);
      expect(obj).toEqual({ a: 2 });
    });

    it("should work with longer paths", () => {
      const obj = { a: { b: { c: 1 } } };
      let result: unknown = 0;
      get_helper("abc", obj, (obj, subpath) => {
        expect(subpath).toEqual("bc");
        result = obj;
      });

      expect(result).toEqual({ b: { c: 1 } });
      expect(obj).toEqual({ a: { b: { c: 1 } } });
    });
  });

  describe("multilayer_get_helper", () => {
    it("should get a value from a single layer", () => {
      const obj = { a: 1 };
      let result = 0;
      multilayer_get_helper(
        "a",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("");
          result = obj as number;
        },
        1
      );

      expect(result).toEqual(1);
      expect(obj).toEqual({ a: 1 });
    });

    it("should set a value from a single layer", () => {
      const obj = { a: 1 };
      let result = 0;
      multilayer_get_helper(
        "a",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("");
          return (result = (obj as number) + 1);
        },
        1
      );

      expect(result).toEqual(2);
      expect(obj).toEqual({ a: 2 });
    });

    it("should work with longer paths", () => {
      const obj = { a: { b: { c: 1 } } };
      let result: unknown = 0;
      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("bc");
          result = obj;
        },
        1
      );

      expect(result).toEqual({ b: { c: 1 } });
      expect(obj).toEqual({ a: { b: { c: 1 } } });
    });

    it("test get with 2 layers", () => {
      const obj = { a: { b: { c: 1 } } };
      let result: unknown = 0;
      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("c");
          result = obj;
        },
        2
      );

      expect(result).toEqual({ c: 1 });
      expect(obj).toEqual({ a: { b: { c: 1 } } });
    });

    it("test set with 2 layers", () => {
      const obj = { a: { b: 1 } };
      let result: unknown = 0;
      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("c");
          return (result = (obj as number) + 1);
        },
        2
      );

      expect(result).toEqual(2);
      expect(obj).toEqual({ a: { b: 2 } });
    });

    it("test new creation with 2 layers", () => {
      const obj = {};

      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("c");
          return 1;
        },
        2
      );

      expect(obj).toEqual({ a: { b: 1 } });
    });

    it("test get with 3 layers", () => {
      const obj = { a: { b: { c: 1 } } };
      let result: unknown = 0;
      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("");
          result = obj;
        },
        3
      );

      expect(result).toEqual(1);
      expect(obj).toEqual({ a: { b: { c: 1 } } });
    });

    it("test set with 3 layers", () => {
      const obj = { a: { b: { c: 1 } } };
      let result: unknown = 0;
      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("");
          return (result = (obj as number) + 1);
        },
        3
      );

      expect(result).toEqual(2);
      expect(obj).toEqual({ a: { b: { c: 2 } } });
    });

    it("test new creation with 3 layers", () => {
      const obj = {};

      multilayer_get_helper(
        "abc",
        obj,
        (obj, subpath) => {
          expect(subpath).toEqual("");
          return 1;
        },
        3
      );

      expect(obj).toEqual({ a: { b: { c: 1 } } });
    });
  });
});

describe("searchTree", () => {
  describe("insert", () => {
    it("should insert a value 3 deep", () => {
      const data = {};
      const tree = searchTree(3, data);
      tree.insert("abcdef", 1);
      expect(data).toEqual({ a: { b: { c: { def: 1 } } } });
    });
  });

  describe("get", () => {
    it("should get a value 3 deep", () => {
      const data = { a: { b: { c: { def: 1 } } } };
      const tree = searchTree(3, data);
      expect(tree.get("abcdef")).toEqual(1);
    });

    it("should return undefined if the value doesn't exist", () => {
      const data = { a: { b: { c: { def: 1 } } } };
      const tree = searchTree(3, data);
      expect(tree.get("abcde")).toEqual(undefined);
    });
  });
});

describe("Cache", () => {
  let cachePath: string;
  let cache: Cache;

  beforeAll(() => {
    // Create a temporary directory for caching
    tmp.setGracefulCleanup();
    const cacheDir = tmp.dirSync({ mode: 0o755, prefix: "jest-cache-" });

    // Set the cache directory as an environment variable
    cachePath = cacheDir.name;

    cache = new Cache(cachePath, 3);
  });

  describe("insertPNG", () => {
    it("should insert png file", () => {
      const data = Buffer.from("test");
      cache.insertPNG("test", data);
    });
  });

  describe("insertSVG", () => {
    it("should insert svg file", () => {
      const data = "<svg></svg>";
      cache.insertSVG("test", data);
    });
  });

  describe("insertHTML", () => {
    it("should insert json file", () => {
      const data = "<html></html>";
      cache.insertHTML("test", data);
    });
  });

  describe("insertCSS", () => {
    it("should insert css file", () => {
      const data = "body { color: red; }";
      cache.insertCSS("test", data);
    });
  });

  afterAll(() => {
    // Clean up the temporary directory after all tests are done
    tmp.setGracefulCleanup();
  });
});
