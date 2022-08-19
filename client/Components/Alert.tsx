import React from "react";

import type { AlertProps } from "./Alert.types";

import "./Alert.css";

export default class Alert extends React.Component<AlertProps> {
  override render(): React.ReactNode {
    return (
      <div className={`alert alert-${this.props.sof} mt-3 mx-auto mb-0`}>{this.props.children}</div>
    );
  }
}
