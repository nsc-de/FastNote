import { TypesetInput, TypesetOutput, start, typeset } from "mathjax-node";
import express from "express";

// Initialize MathJax
start();

function render(input: TypesetInput) {
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

const port = 3000;

const app = express();

app.get("/formula/:formula/:format", (req, res) => {
  const formula = atob(req.params.formula);
  const format = req.params.format;

  if (format === "svg") {
    (async () => {
      try {
        const result = await render({
          math: formula,
          format: "TeX",
          svg: true,
        });

        res.status(200).set("Content-Type", "image/svg+xml").send(result.svg);
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
        const result = await render({
          math: formula,
          format: "TeX",
          html: true,
        });

        res
          .status(200)
          .send(
            "<!DOCTYPE html><html><head><meta charset='utf-8'><link rel='stylesheet' href='./css'/><title>MathJax Node</title><style>body {font-size: 20px;}</style></head><body>" +
              result.html +
              "</body></html>"
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
        const result = await render({
          math: formula,
          format: "TeX",
          html: true,
        });

        res.status(200).send(result.css);
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
