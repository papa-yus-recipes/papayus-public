import type { Doc } from "./types";

export interface ITag {
  name: string;
  category: string;
}

export type TagDoc = Doc<ITag>;

export type ITagReference = Pick<ITag, "name" | "category">;
