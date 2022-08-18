type Validator = (v: unknown) => booean | Promise<boolean>;

export type Validators<T extends string> = {
  [K in T]: Validator;
};
