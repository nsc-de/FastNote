import { start } from "mathjax-node";
import express from "express";
import { Renderer } from "./renderer";

// Initialize MathJax
start();

const port = 3000;

const app = express();

let renderer: Renderer;

(async () => {
  renderer = await Renderer.create("./cache");
})();

app.get("/formula/:formula/:format", (req, res) => {
  const formula = atob(req.params.formula);
  const format = req.params.format;

  if (format === "png") {
    (async () => {
      try {
        const result = await renderer.renderPNG(formula);
        res.status(200).set("Content-Type", "image/png").send(result);
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
      }
    })();

    return;
  }

  if (format === "jpg" || format === "jpeg") {
    (async () => {
      try {
        const result = await renderer.renderJPEG(formula);
        res.status(200).set("Content-Type", "image/jpeg").send(result);
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
      }
    })();

    return;
  }

  if (format === "svg") {
    (async () => {
      try {
        const result = await renderer.renderSVG(formula);
        res.status(200).set("Content-Type", "image/svg+xml").send(result);
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
      }
    })();

    return;
  }

  if (format === "html") {
    (async () => {
      try {
        const result = await renderer.renderHTML(formula);
        res.status(200).send(
          `<!DOCTYPE html><html><head><meta charset='utf-8'><link rel='stylesheet' href='./css'/><title>MathJax Node</title>
            <style>body {font-size: 20px;}</style></head><body>${result}</body></html>`
        );
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
      }
    })();

    return;
  }

  if (format === "css") {
    (async () => {
      try {
        const result = await renderer.renderCSS(formula);
        res.status(200).send(result);
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
      }
    })();

    return;
  }

  res.status(400).send("Invalid format");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
