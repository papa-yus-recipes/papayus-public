import type { ClassNameProps } from "../types";
import type { ReactNode } from "react";

export type ModalFormProps = ClassNameProps & {
  "id": string;
  "body": ReactNode;
  "submit-text": ReactNode;
};
