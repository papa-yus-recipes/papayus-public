import type { H1Prefix, H1Props } from "./H1.types";
import type { ChildrenProps, Prefix } from "./types";

export type ContentProps = Prefix<H1Prefix, H1Props> & ChildrenProps;
