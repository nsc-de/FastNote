import { TypesetInput, TypesetOutput, typeset } from "mathjax-node";
import { Cache } from "./cache";
import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

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
    const svgPath = await this.svgPath(requested);
    const pngPath = await this.cache.pathForPNG(requested);

    await fs.ensureDir(path.dirname(pngPath));

    await sharp(svgPath).resize(1000).png().toFile(pngPath);

    return await fs.readFile(pngPath);
  }

  public async pngPath(requested: string) {
    await this.renderPNG(requested);
    return this.cache.pathForPNG(requested);
  }

  public async renderJPEG(requested: string) {
    const svgPath = await this.svgPath(requested);
    const jpegPath = await this.cache.pathForJPEG(requested);

    await fs.ensureDir(path.dirname(jpegPath));

    await sharp(svgPath)
      .resize(1000)
      .flatten({ background: "#ffffff" })
      .jpeg()
      .toFile(jpegPath);

    return await fs.readFile(jpegPath);
  }

  public async jpegPath(requested: string) {
    await this.renderJPEG(requested);
    return this.cache.pathForJPEG(requested);
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

  public async htmlPath(requested: string) {
    await this.renderHTML(requested);
    return this.cache.pathForHTML(requested);
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

  public async cssPath(requested: string) {
    await this.renderCSS(requested);
    return this.cache.pathForCSS(requested);
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

  public async svgPath(requested: string) {
    await this.renderSVG(requested);
    return this.cache.pathForSVG(requested);
  }

  static async create(cachePath: string) {
    const cache = await Cache.create(cachePath);
    return new Renderer(cache);
  }
}
