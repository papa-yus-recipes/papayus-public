type Validator = (v: any) => boolean;

export type Validators<K extends string> = Record<K, Validator>;
