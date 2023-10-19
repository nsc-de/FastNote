import fs from "fs-extra";
import path from "path";
import crypto from "crypto";

export function get_helper<T>(
  path: string,
  obj: { [key: string]: T },
  lambda: (obj: T, subpath: string) => void | T
) {
  const path_head = path[0];
  const path_tail = path.slice(1);

  const result = lambda(obj[path_head], path_tail);
  if (result !== undefined) obj[path_head] = result;

  return obj;
}

export function multilayer_get_helper(
  path: string,
  obj: unknown,
  lambda: (obj: unknown, subpath: string) => void | unknown,
  layers: number
): unknown {
  if (layers === 0) {
    return lambda(obj, path);
  }

  return get_helper(path, obj as Record<string, unknown>, (obj, subpath) => {
    const old_value = (obj as Record<string, unknown>) ?? {};
    return (
      multilayer_get_helper(subpath, old_value, lambda, layers - 1) ?? old_value
    );
  });
}

export function searchTree<T>(treeLayers: number = 3, data?: unknown) {
  const cache = data ?? {};

  function insert(path: string, value: T) {
    multilayer_get_helper(
      path,
      cache,
      (obj, subpath) => {
        (obj as Record<string, T>)[subpath] = value;
      },
      treeLayers
    );
  }

  function get(path: string): T | undefined {
    let result: T | undefined = undefined;
    multilayer_get_helper(
      path,
      cache,
      (obj, subpath) => {
        result = (obj as Record<string, T>)[subpath];
      },
      treeLayers
    );
    return result;
  }

  return { insert, get, cache };
}

type SearchTree<T> = ReturnType<typeof searchTree<T>>;

interface CacheEntry {
  requested: string;
  pngPath?: string;
  svgPath?: string;
  htmlPath?: string;
  cssPath?: string;
}

export class Cache {
  readonly searchTree: SearchTree<CacheEntry>;
  private requestsSave = false;
  private saving = false;
  constructor(
    readonly path: string,
    readonly treeLayers: number = 3,
    data?: { [key: string]: CacheEntry }
  ) {
    this.searchTree = searchTree(treeLayers, data);
  }

  async save() {
    if (this.saving) {
      this.requestsSave = true;
      return;
    }

    this.saving = true;
    this.requestsSave = false;

    await fs.writeJSON(
      path.join(this.path, "cache.json"),
      this.searchTree.cache
    );

    this.saving = false;
    if (this.requestsSave) this.save();
  }

  async insertPNG(requested: string, pngContents: Buffer) {
    const hash = hashName(requested);

    const pngPath = cachePath(this.path, hash, "png");

    await fs.ensureDirSync(path.dirname(pngPath));
    await fs.writeFile(pngPath, pngContents);

    const entry = this.entryFor(requested);

    entry.pngPath = pngPath;
    this.searchTree.insert(requested, entry);
    this.save();
  }

  async insertSVG(requested: string, svgContents: string) {
    const hash = hashName(requested);

    const svgPath = cachePath(this.path, hash, "svg");

    await fs.ensureDirSync(path.dirname(svgPath));
    await fs.writeFile(svgPath, svgContents);

    const entry = this.entryFor(requested);

    entry.svgPath = svgPath;
    this.searchTree.insert(requested, entry);
    this.save();
  }

  async insertHTML(requested: string, htmlContents: string) {
    const hash = hashName(requested);

    const htmlPath = cachePath(this.path, hash, "html");

    await fs.ensureDirSync(path.dirname(htmlPath));
    await fs.writeFile(htmlPath, htmlContents);

    const entry = this.entryFor(requested);

    entry.htmlPath = htmlPath;
    this.searchTree.insert(requested, entry);
    this.save();
  }

  async insertCSS(requested: string, cssContents: string) {
    const hash = hashName(requested);

    const cssPath = cachePath(this.path, hash, "css");

    await fs.ensureDirSync(path.dirname(cssPath));
    await fs.writeFile(cssPath, cssContents);

    const entry = this.entryFor(requested);

    entry.cssPath = cssPath;
    this.searchTree.insert(requested, entry);
    this.save();
  }

  async getPNG(requested: string): Promise<Buffer | undefined> {
    const entry = this.searchTree.get(requested);
    if (entry === undefined || entry.pngPath === undefined) return undefined;

    return await fs.readFile(entry.pngPath);
  }

  async getSVG(requested: string): Promise<string | undefined> {
    const entry = this.searchTree.get(requested);
    if (entry === undefined || entry.svgPath === undefined) return undefined;

    return await fs.readFile(entry.svgPath, "utf-8");
  }

  async getHTML(requested: string): Promise<string | undefined> {
    const entry = this.searchTree.get(requested);
    if (entry === undefined || entry.htmlPath === undefined) return undefined;

    return await fs.readFile(entry.htmlPath, "utf-8");
  }

  async getCSS(requested: string): Promise<string | undefined> {
    const entry = this.searchTree.get(requested);
    if (entry === undefined || entry.cssPath === undefined) return undefined;

    return await fs.readFile(entry.cssPath, "utf-8");
  }

  private entryFor(requested: string): CacheEntry {
    return (
      this.searchTree.get(requested) ?? {
        requested,
      }
    );
  }
}

function hashName(it: string) {
  return crypto.createHash("sha512").update(it).digest("base64");
}

function cachePath(root: string, hash: string, cacheType: string) {
  hash = hash.replace(/\//g, "_");

  const pathParts = [
    root, // root
    cacheType, // html folder
    hash.slice(0, 2), // first 2 chars of hash
    hash.slice(2, 4), // next 2 chars of hash
    hash.slice(4), // rest of hash
  ];

  return path.join(...pathParts);
}
