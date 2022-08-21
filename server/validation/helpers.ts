export const between = (n: number, lower: number, upper: number) => n >= lower && n <= upper;

export const isString = (v: unknown) => typeof v === "string";

export const isUuid = (v: unknown) => isString(v) && (<string>v).length === 36;
