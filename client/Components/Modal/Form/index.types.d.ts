import type { ClassNameProps } from "../../types";
import type { FormEventHandler, ReactNode } from "react";

export type ModalFormProps = ClassNameProps & {
  "id": string;
  "body": ReactNode;
  "onSubmit"?: FormEventHandler<HTMLFormElement>;
  "submit-text"?: ReactNode;
};
