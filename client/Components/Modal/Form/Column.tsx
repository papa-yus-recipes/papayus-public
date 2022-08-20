import React from "react";

import type { ModalFormColumnProps } from "./Column.types";

export default class ModalFormColumn extends React.Component<ModalFormColumnProps> {
  override render() {
    return <div className={this.props.half ? "col-md-6" : ""}>{this.props.children}</div>;
  }
}
