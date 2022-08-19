import type { ChildrenProps } from "./types";

export type AlertProps = ChildrenProps & {
  sof: "success" | "danger";
};
