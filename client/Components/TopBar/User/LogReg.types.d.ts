import type { AlertProps } from "../../Alert.types";
import type { Prefix } from "../../types";
import type { UpdateStateProps } from "./index.types";

type AlertPropsColor = Pick<AlertProps, "color"> & {
  message: string;
};

export type TopBarUserLogRegProps = UpdateStateProps;

export type TopBarUserLogRegStates = Prefix<"log", AlertPropsColor> &
  Prefix<"reg", AlertPropsColor>;
