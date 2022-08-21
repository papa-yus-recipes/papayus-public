import type { ClassNameProps } from "./types";

export type RatingProps = ClassNameProps & {
  "font-size": number;
  "id": string;
  "default"?: string;
  "disabled"?: boolean;
};
