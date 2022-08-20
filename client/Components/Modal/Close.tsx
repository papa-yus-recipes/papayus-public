import React from "react";

import type { ModalCloseProps } from "./Close.types";

export default class ModalClose extends React.Component<ModalCloseProps> {
  override render() {
    return (
      <button className={this.props.className} data-bs-dismiss="modal" title="Close" type="button">
        {this.props.children}
      </button>
    );
  }
}
