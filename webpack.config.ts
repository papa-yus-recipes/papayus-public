import { resolve } from "path";

import type { Configuration, Entry } from "webpack";

const resolvePathFromRoot = (path: string) => resolve(path);

type Target = string | false | string[];

const webpackConfig = (
  name: string,
  entry: Entry,
  include_paths: string[],
  output_path: string,
  target: Target = "web"
) => {
  const resolved_include_paths = include_paths.map(resolvePathFromRoot);
  const resolve_modules =
    target === "node"
      ? [...resolved_include_paths, resolvePathFromRoot("node_modules")]
      : resolved_include_paths;

  return <Configuration>{
    entry,
    name,
    target,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          include: resolved_include_paths
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: resolvePathFromRoot(output_path)
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: resolve_modules,
      roots: resolved_include_paths
    }
  };
};

export default [
  webpackConfig("src", "./src/index.ts", ["src"], "dist", "node"),
  webpackConfig("public", "./public-ts/index.ts", ["public-ts"], "public")
];
