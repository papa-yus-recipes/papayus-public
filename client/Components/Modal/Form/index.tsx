import React from "react";

import type { ModalFormProps } from "./index.types";

import ModalClose from "../Close";

export class ModalForm extends React.Component<ModalFormProps> {
  override render() {
    return (
      <form className={this.props.className} id={this.props.id} onSubmit={this.props.onSubmit}>
        <div className="container modal-body">
          <div className="gy-3 row">{this.props.body}</div>
        </div>
        <div className="modal-footer">
          <ModalClose className="btn btn-secondary">Close</ModalClose>
          <button className="btn btn-primary" type="submit">
            {this.props["submit-text"] || "Submit"}
          </button>
        </div>
      </form>
    );
  }
}
