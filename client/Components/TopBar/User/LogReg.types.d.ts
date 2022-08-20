import type { AlertProps } from "../../Alert.types";
import type { Prefix } from "../../types";

type AlertPropsColor = Pick<AlertProps, "color"> & {
  message: string;
};

export type TopBarUserLogRegStates = Prefix<"log", AlertPropsColor> &
  Prefix<"reg", AlertPropsColor>;
