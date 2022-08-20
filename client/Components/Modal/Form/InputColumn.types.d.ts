import type { ChildrenProps, Prefix } from "../../types";
import type { ModalFormColumnPrefix, ModalFormColumnProps } from "./Column.types";
import type { ModalFormInputPrefix, ModalFormInputProps } from "./Input.types";
import type { ModalFormLabelPrefix, ModalFormLabelProps } from "./Label.types";

export type ModalFormInputColumnProps = ChildrenProps &
  Prefix<ModalFormColumnPrefix, Omit<ModalFormColumnProps, "children">> &
  Prefix<ModalFormInputPrefix, ModalFormInputProps> &
  Prefix<ModalFormLabelPrefix, Omit<ModalFormLabelProps, "children" | "htmlFor">>;
