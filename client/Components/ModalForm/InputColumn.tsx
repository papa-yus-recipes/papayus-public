import React from "react";

import type { ModalFormInputColumnProps } from "./InputColumn.types";

import ModalFormColumn from "./Column";
import ModalFormInput from "./Input";
import ModalFormLabel from "./Label";

export default class ModalFormInputColumn extends React.Component<ModalFormInputColumnProps> {
  override render() {
    return (
      <ModalFormColumn half={this.props["column-half"]}>
        <ModalFormLabel bi-icon={this.props["label-bi-icon"]} htmlFor={this.props["input-id"]}>
          {this.props.children}
        </ModalFormLabel>
        <ModalFormInput
          id={this.props["input-id"]}
          name={this.props["input-name"]}
          required={this.props["input-required"]}
          type={this.props["input-type"]}
        />
      </ModalFormColumn>
    );
  }
}
