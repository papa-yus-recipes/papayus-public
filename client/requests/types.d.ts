export type HasId = {
  id: string;
};

export type HasTimestamps<K extends string> = Record<K, Date>;

export type Operator = "AND" | "OR";
