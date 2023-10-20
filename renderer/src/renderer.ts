import { TypesetInput, TypesetOutput, typeset } from "mathjax-node";
import { Cache } from "./cache";

export function render(input: TypesetInput) {
  return new Promise<TypesetOutput>((resolve, reject) => {
    typeset(input, (data) => {
      if (data.errors) {
        reject(data.errors);
      } else {
        resolve(data);
      }
    });
  });
}

export class Renderer {
  constructor(readonly cache: Cache) {}

  public async renderPNG(requested: string) {
    const cached = await this.cache.getPNG(requested);

    if (cached) return cached;

    const result = await render({
      math: requested,
      format: "TeX",
      svg: true,
    });

    const svg = result.svg;

    throw new Error("Not implemented");
  }

  public async renderHTML(requested: string) {
    const cached = await this.cache.getHTML(requested);

    if (cached) return cached;

    const result = await render({
      math: requested,
      format: "TeX",
      html: true,
    });

    await this.cache.insertHTML(requested, result.html!);
    await this.cache.insertCSS(requested, result.css!);

    return result.html!;
  }

  public async renderCSS(requested: string) {
    const cached = await this.cache.getCSS(requested);

    if (cached) return cached;

    const result = await render({
      math: requested,
      format: "TeX",
      html: true,
    });

    await this.cache.insertHTML(requested, result.html! ?? "");
    await this.cache.insertCSS(requested, result.css ?? "");

    return result.css!;
  }

  public async renderSVG(requested: string) {
    const cached = await this.cache.getSVG(requested);

    if (cached) return cached;

    const result = await render({
      math: requested,
      format: "TeX",
      svg: true,
    });

    await this.cache.insertSVG(requested, result.svg!);

    return result.svg!;
  }

  static async create(cachePath: string) {
    const cache = await Cache.create(cachePath);
    return new Renderer(cache);
  }
}
