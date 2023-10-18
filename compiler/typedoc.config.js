const path = require("path");

module.exports = {
  entryPoints: [path.resolve(__dirname, "./src/index.ts")],
  out: path.resolve(__dirname, "./docs"),
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  externalPattern: "node_modules/",
  exclude: ["node_modules"],
  excludeExternals: false,
  sourceLinkTemplate: `https://github.com/nsc-de/FastNote/tree/{gitRevision}/{path}#L{line}`,
  includeVersion: true,
  excludeInternal: true,
  skipErrorChecking: true,
};
