import dynamoose from "dynamoose";

import type { TagItem } from "./Tag.types";

export const Tag = dynamoose.model<TagItem>("tag", {
  name: String,
  category: String
});
