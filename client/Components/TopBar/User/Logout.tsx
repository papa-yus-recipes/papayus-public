import React from "react";

import type { TopBarUserLogoutProps } from "./Logout.types";

import { dismissModal } from "../../../helpers";
import { logout } from "../../../requests/users.requests";
import BsIcon from "../../BsIcon";
import ModalClose from "../../Modal/Close";

export default class TopBarUserLogout extends React.Component<TopBarUserLogoutProps> {
  static id = "logout";
  static toggle_id = `${TopBarUserLogout.id}-toggle`;

  constructor(props: TopBarUserLogoutProps) {
    super(props);

    this.logoutOnClick = this.logoutOnClick.bind(this);
  }

  private logoutOnClick() {
    return logout().then(async (res) => {
      if (!res.ok) return;

      dismissModal();
      this.props.updateState();
    });
  }

  override render() {
    return (
      <>
        <button
          className="align-items-center btn d-flex text-dark"
          id={TopBarUserLogout.toggle_id}
          data-bs-target={`#${TopBarUserLogout.id}`}
          data-bs-toggle="modal"
          title="Logout"
          type="button"
        >
          <BsIcon font-size={4} icon="box-arrow-right" />
        </button>

        <div className="fade modal" id={TopBarUserLogout.id}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Logout?</h5>
                <ModalClose className="btn-close" />
              </div>
              <div className="gap-3 justify-content-center modal-footer">
                <button className="btn btn-danger" onClick={this.logoutOnClick} type="button">
                  Logout
                </button>
                <ModalClose className="btn btn-secondary">Cancel</ModalClose>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
