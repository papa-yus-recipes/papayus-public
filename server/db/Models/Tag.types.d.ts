import type { Item } from "./types";

export type TagKey = string;

export type Tag = { name: TagKey } & {
  category: string;
};

export type TagItem = Item<Tag>;
