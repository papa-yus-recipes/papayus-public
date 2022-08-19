import React from "react";

import type { NeverRecord } from "../../types";
import type { TopBarUserLogRegStates } from "./LogReg.types";

import { createUser } from "../../../requests/users.requests";
import Alert from "../../Alert";
import BsIcon from "../../BsIcon";
import { ModalForm } from "../../ModalForm";
import ModalFormInputColumn from "../../ModalForm/InputColumn";
import NavTabs from "../../NavTabs";

export default class TopBarUserLogReg extends React.Component<NeverRecord, TopBarUserLogRegStates> {
  static id = "logreg";
  static log_id = `${TopBarUserLogReg.id}-log`;
  static reg_id = `${TopBarUserLogReg.id}-reg`;
  static toggle_id = `${TopBarUserLogReg.id}-toggle`;
  static username_name = `username`;
  static password_name = `password`;
  static login = "Login";
  static register = "Register";

  constructor(props: NeverRecord) {
    super(props);

    this.state = { sof: "", message: "" };

    this.confirmPasswordOnChange = this.confirmPasswordOnChange.bind(this);
    this.loginOnSubmit = this.loginOnSubmit.bind(this);
    this.registerOnSubmit = this.registerOnSubmit.bind(this);
  }

  private confirmPasswordOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
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

  private loginOnSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }

  private registerOnSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const form_data = new FormData(form);
    return createUser({
      username: form_data.get("username") as string,
      password: form_data.get("password") as string
    })
      .then(() => {
        form.reset();

        (
          document.querySelector(`[data-bs-target="#${TopBarUserLogReg.log_id}"]`) as HTMLLIElement
        ).classList.add("active");
        (document.getElementById(TopBarUserLogReg.log_id) as HTMLDivElement).classList.add(
          "active",
          "show"
        );
        (
          document.querySelector(`[data-bs-target="#${TopBarUserLogReg.reg_id}"]`) as HTMLLIElement
        ).classList.remove("active");
        (document.getElementById(TopBarUserLogReg.reg_id) as HTMLDivElement).classList.remove(
          "active",
          "show"
        );

        this.setState({ sof: "success", message: "Registration Successful! Please Login below." });
      })
      .catch(({ message }) => this.setState({ sof: "danger", message }));
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
                      {this.state.sof === "success" && (
                        <Alert sof={this.state.sof}>{this.state.message}</Alert>
                      )}
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
                  onSubmit={this.loginOnSubmit}
                  submit-text={TopBarUserLogReg.login}
                />
                <ModalForm
                  body={
                    <>
                      {this.state.sof === "danger" && (
                        <Alert sof={this.state.sof}>{this.state.message}</Alert>
                      )}
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
                        input-onChange={this.confirmPasswordOnChange}
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
                  onSubmit={this.registerOnSubmit}
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
