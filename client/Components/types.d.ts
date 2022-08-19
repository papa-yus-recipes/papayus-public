import React from "react";

export type ChildrenProps = {
  children: React.ReactNode;
};

export type ClassNameProps = {
  className?: string;
};

export type NeverRecord = Record<string, never>;

export type Prefix<P, T> = `${P}-${T}`;
