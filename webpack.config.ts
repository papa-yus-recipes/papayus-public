import { resolve } from "path";

import type { Configuration } from "webpack";

const include = [resolve("src")];

const config: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        include,
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: resolve("dist")
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [...include, resolve("node_modules")],
    roots: include
  },
  target: "node"
};

export default config;
