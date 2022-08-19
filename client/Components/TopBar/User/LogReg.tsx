import React from "react";

import BsIcon from "../../BsIcon";
import { ModalForm } from "../../ModalForm";
import ModalFormInputColumn from "../../ModalForm/InputColumn";

export default class LogReg extends React.Component {
  static id = "logreg";
  static log_id = `${LogReg.id}-log`;
  static reg_id = `${LogReg.id}-reg`;
  static toggle_id = `${LogReg.id}-toggle`;
  static username_name = `username`;
  static password_name = `password`;

  override componentDidMount() {
    (document.getElementById(LogReg.log_id) as HTMLDivElement).classList.add("active", "show");
  }

  override render() {
    return (
      <>
        <button
          className="align-items-center btn d-flex text-primary"
          data-bs-target={`#${LogReg.id}`}
          data-bs-toggle="modal"
          id={LogReg.toggle_id}
          title="Login/Register"
          type="button"
        >
          <span className="me-2">Login/Register</span>
          <BsIcon font-size={3} icon="box-arrow-in-left" />
        </button>

        <div className="fade modal" id={LogReg.id}>
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
                        input-id={`${LogReg.log_id}-${LogReg.username_name}`}
                        input-name={LogReg.username_name}
                        input-type="text"
                        label-bi-icon="person-fill"
                      >
                        Username
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-id={`${LogReg.log_id}-${LogReg.password_name}`}
                        input-name={LogReg.password_name}
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
                  id={LogReg.log_id}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
