export type NeverRecord = Record<string, never>;

export type Unknown<T extends Record<string, any>> = {
  [K in keyof T]: unknown;
};
