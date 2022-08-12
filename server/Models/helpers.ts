import { randomUUID } from "crypto";

import type { SchemaDefinition } from "dynamoose/dist/Schema";

type Attribute = SchemaDefinition[string];

export const id: Attribute = {
  type: String,
  default: () => randomUUID()
};

export const rangeKey: Attribute = {
  type: String,
  rangeKey: true,
  required: true
};

export const between = (n: number, lower: number, upper: number) => n >= lower && n <= upper;
