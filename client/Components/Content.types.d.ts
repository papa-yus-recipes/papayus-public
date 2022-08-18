import type { H1Prefix, H1Props } from "./H1.types";
import type { ChildrenProps, Prefix } from "./types";

export type ContentProps = {
  [K in keyof H1Props as Prefix<H1Prefix, K>]: H1Props[K];
} & ChildrenProps;
