import type { BsIconPrefix, BsIconProps } from "../BsIcon.types";
import type { ChildrenProps, Prefix } from "../types";
import type { ModalFormInputProps } from "./Input.types";

export type ModalFormLabelPrefix = "label";

export type ModalFormLabelProps = ChildrenProps &
  Prefix<BsIconPrefix, Pick<BsIconProps, "icon">> & {
    htmlFor: ModalFormInputProps["id"];
  };
