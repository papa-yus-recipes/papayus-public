import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type ClassNameProps = {
  className?: string;
};

export type NeverRecord = Record<string, never>;

export type Prefix<P extends string, T> = {
  [K in keyof T as `${P}-${K}`]: T[K];
};
