export type NeverRecord = Record<string, never>;

export type QueryParam = string | undefined;

export type Query<T extends Record<string, any>> = {
  [K in keyof T]?: QueryParam;
};
