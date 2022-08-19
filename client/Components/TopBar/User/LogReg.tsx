import React from "react";

import BsIcon from "../../BsIcon";
import { ModalForm } from "../../ModalForm";
import ModalFormInputColumn from "../../ModalForm/InputColumn";
import NavTabs from "../../NavTabs";

export default class TopBarUserLogReg extends React.Component {
  static id = "logreg";
  static log_id = `${TopBarUserLogReg.id}-log`;
  static reg_id = `${TopBarUserLogReg.id}-reg`;
  static toggle_id = `${TopBarUserLogReg.id}-toggle`;
  static username_name = `username`;
  static password_name = `password`;
  static login = "Login";
  static register = "Register";

  #confirmPasswordOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
    ev.target.setCustomValidity(
      ev.target.value ===
        (
          document.getElementById(
            `${TopBarUserLogReg.reg_id}-${TopBarUserLogReg.password_name}`
          ) as HTMLInputElement
        ).value
        ? ""
        : "Passwords do not match"
    );
  }

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
          type="button"
        >
          <span className="me-2">
            {TopBarUserLogReg.login}/{TopBarUserLogReg.register}
          </span>
          <BsIcon font-size={3} icon="box-arrow-in-left" />
        </button>

        <div className="fade modal" id={TopBarUserLogReg.id}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <NavTabs
                  id={`${TopBarUserLogReg.id}-nav-tabs`}
                  tabs={[
                    { id: TopBarUserLogReg.log_id, title: TopBarUserLogReg.login },
                    { id: TopBarUserLogReg.reg_id, title: TopBarUserLogReg.register }
                  ]}
                />
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
                        input-autoComplete="username"
                        input-id={`${TopBarUserLogReg.log_id}-${TopBarUserLogReg.username_name}`}
                        input-name={TopBarUserLogReg.username_name}
                        input-required={true}
                        input-type="text"
                        label-bi-icon="person-fill"
                      >
                        Username
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-autoComplete="current-password"
                        input-id={`${TopBarUserLogReg.log_id}-${TopBarUserLogReg.password_name}`}
                        input-name={TopBarUserLogReg.password_name}
                        input-required={true}
                        input-type="password"
                        label-bi-icon="lock-fill"
                      >
                        Password
                      </ModalFormInputColumn>
                    </>
                  }
                  className="fade tab-pane"
                  id={TopBarUserLogReg.log_id}
                  submit-text={TopBarUserLogReg.login}
                />
                <ModalForm
                  body={
                    <>
                      <ModalFormInputColumn
                        input-autoComplete="username"
                        input-id={`${TopBarUserLogReg.reg_id}-${TopBarUserLogReg.username_name}`}
                        input-name={TopBarUserLogReg.username_name}
                        input-required={true}
                        input-type="text"
                        label-bi-icon="person-fill"
                      >
                        Username
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-autoComplete="new-password"
                        input-id={`${TopBarUserLogReg.reg_id}-${TopBarUserLogReg.password_name}`}
                        input-name={TopBarUserLogReg.password_name}
                        input-required={true}
                        input-type="password"
                        label-bi-icon="lock-fill"
                      >
                        Password
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-autoComplete="new-password"
                        input-id=""
                        input-name=""
                        input-onChange={this.#confirmPasswordOnChange}
                        input-required={true}
                        input-type="password"
                        label-bi-icon="lock-fill"
                      >
                        Confirm Password
                      </ModalFormInputColumn>
                    </>
                  }
                  className="fade tab-pane"
                  id={TopBarUserLogReg.reg_id}
                  submit-text={TopBarUserLogReg.register}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
