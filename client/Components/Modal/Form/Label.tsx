import React from "react";

import type { ModalFormLabelProps } from "./Label.types";

import BsIcon from "../../BsIcon";

export default class ModalFormLabel extends React.Component<ModalFormLabelProps> {
  override render() {
    return (
      <label htmlFor={this.props.htmlFor}>
        <BsIcon className="me-1" font-size={6} icon={this.props["bi-icon"]} />
        {this.props.children}
      </label>
    );
  }
}
