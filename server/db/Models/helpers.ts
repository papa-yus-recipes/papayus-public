import type { AttributeDefinition, AttributeType } from "./types";

export const required = (type: AttributeType): AttributeDefinition => ({
  type,
  required: true
});

export const rangeKey: AttributeDefinition = {
  type: String,
  rangeKey: true
};
