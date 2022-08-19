import React from "react";

import BsIcon from "../../BsIcon";
import { ModalForm } from "../../ModalForm";
import ModalFormInputColumn from "../../ModalForm/InputColumn";

export default class TopBarUserLogReg extends React.Component {
  static id = "logreg";
  static log_id = `${TopBarUserLogReg.id}-log`;
  static reg_id = `${TopBarUserLogReg.id}-reg`;
  static toggle_id = `${TopBarUserLogReg.id}-toggle`;
  static username_name = `username`;
  static password_name = `password`;

  override componentDidMount() {
    (document.getElementById(TopBarUserLogReg.log_id) as HTMLDivElement).classList.add(
      "active",
      "show"
    );
  }

  override render() {
    return (
      <>
        <button
          className="align-items-center btn d-flex text-primary"
          data-bs-target={`#${TopBarUserLogReg.id}`}
          data-bs-toggle="modal"
          id={TopBarUserLogReg.toggle_id}
          title="Login/Register"
          type="button"
        >
          <span className="me-2">Login/Register</span>
          <BsIcon font-size={3} icon="box-arrow-in-left" />
        </button>

        <div className="fade modal" id={TopBarUserLogReg.id}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <nav className="nav nav-tabs"></nav>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  title="Close"
                  type="button"
                ></button>
              </div>
              <div className="tab-content">
                <ModalForm
                  body={
                    <>
                      <ModalFormInputColumn
                        input-id={`${TopBarUserLogReg.log_id}-${TopBarUserLogReg.username_name}`}
                        input-name={TopBarUserLogReg.username_name}
                        input-type="text"
                        label-bi-icon="person-fill"
                      >
                        Username
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-id={`${TopBarUserLogReg.log_id}-${TopBarUserLogReg.password_name}`}
                        input-name={TopBarUserLogReg.password_name}
                        input-type="password"
                        label-bi-icon="lock-fill"
                      >
                        Password
                      </ModalFormInputColumn>
                    </>
                  }
                  footer={
                    <button className="btn btn-primary" type="submit">
                      Login
                    </button>
                  }
                  id={TopBarUserLogReg.log_id}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
