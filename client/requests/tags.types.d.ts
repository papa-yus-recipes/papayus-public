export type ITag = {
  name: string;
  category: string;
};

export type ITagReference = Pick<ITag, "name" | "category">;
