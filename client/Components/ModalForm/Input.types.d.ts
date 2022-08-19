import type { ChangeEventHandler, InputHTMLAttributes } from "react";

export type ModalFormInputPrefix = "input";

export type ModalFormInputProps = {
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  id: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  type: string;
};
