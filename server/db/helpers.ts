import type { Operator } from "./types";

export const contains = (key: string, value: string) => `contains(${key},${value})`;

export const joinConditions = (conditions: string[], operator: Operator) =>
  conditions.join(` ${operator} `);
