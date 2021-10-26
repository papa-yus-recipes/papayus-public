import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const config: InitialOptionsTsJest = {
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "public/(.*)": "<rootDir>/public/$1"
  },
  moduleDirectories: ["node_modules", "src", "public"],
  preset: "ts-jest",
  testEnvironment: "node"
};

export default config;
