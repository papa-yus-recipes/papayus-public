import React from "react";

import type { ModalFormInputProps } from "./Input.types";

export default class ModalFormInput extends React.Component<ModalFormInputProps> {
  override render() {
    return (
      <input
        className="form-control"
        autoComplete={this.props.autoComplete}
        id={this.props.id}
        name={this.props.name}
        onChange={this.props.onChange}
        required={this.props.required}
        type={this.props.type}
      />
    );
  }
}
