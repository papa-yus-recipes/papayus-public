import type { Item } from "./types";

export interface ITag {
  name: string;
  category: string;
}

export type TagItem = Item<ITag>;

export type ITagReference = ITag["name"];
