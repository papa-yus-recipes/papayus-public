import { resolve } from "path";

import type { Configuration } from "webpack";

const include = [resolve("client")];

const config: Configuration = {
  entry: {
    index: "./client/index.tsx"
  },
  module: {
    rules: [
      {
        include,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: resolve("public/js")
  },
  resolve: {
    extensions: [".tsx"]
  }
};

export default config;
