import React from "react";

import type { ModalFormProps } from "./index.types";

export class ModalForm extends React.Component<ModalFormProps> {
  override render() {
    return (
      <form className={this.props.className} id={this.props.id}>
        <div className="container modal-body">
          <div className="gy-3 row">{this.props.body}</div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal" title="Close" type="button">
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            {this.props["submit-text"] || "Submit"}
          </button>
        </div>
      </form>
    );
  }
}
