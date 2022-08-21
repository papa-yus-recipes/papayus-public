import type { ChildrenProps, ClassNameProps } from "./types";

export type SectionProps = {
  title: string;
} & ChildrenProps &
  ClassNameProps;
