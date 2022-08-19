import React from "react";

import type { ModalFormProps } from "./index.types";

export class ModalForm extends React.Component<ModalFormProps> {
  override render() {
    return (
      <form className="fade tab-pane" id={this.props.id}>
        <div className="container modal-body">
          <div className="gy-3 row">{this.props.body}</div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal" title="Close" type="button">
            Close
          </button>
          {this.props.footer}
        </div>
      </form>
    );
  }
}
