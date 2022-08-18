export type Tag = {
  name: string;
  category: string;
};

export type TagReference = Pick<Tag, "name" | "category">;
