import React from "react";

import type { TopBarUserLogRegProps, TopBarUserLogRegStates } from "./LogReg.types";

import { dismissModal } from "../../../helpers";
import { createUser, login } from "../../../requests/users.requests";
import Alert from "../../Alert";
import BsIcon from "../../BsIcon";
import ModalClose from "../../Modal/Close";
import { ModalForm } from "../../Modal/Form";
import ModalFormInputColumn from "../../Modal/Form/InputColumn";
import NavTabs from "../../NavTabs";

export default class TopBarUserLogReg extends React.Component<
  TopBarUserLogRegProps,
  TopBarUserLogRegStates
> {
  static id = "logreg";
  static log_id = `${TopBarUserLogReg.id}-log`;
  static reg_id = `${TopBarUserLogReg.id}-reg`;
  static toggle_id = `${TopBarUserLogReg.id}-toggle`;
  static username_name = `username`;
  static password_name = `password`;
  static login = "Login";
  static register = "Register";

  constructor(props: TopBarUserLogRegProps) {
    super(props);

    this.state = { "log-color": "", "log-message": "", "reg-color": "", "reg-message": "" };

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
    const form = ev.target as HTMLFormElement;
    const form_data = new FormData(form);
    return login({
      username: form_data.get("username") as string,
      password: form_data.get("password") as string
    }).then(async (res) => {
      if (!res.ok) return this.setState({ "log-color": "danger", "log-message": await res.text() });

      dismissModal();
      this.props.updateState();
    });
  }

  private registerOnSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const form_data = new FormData(form);
    return createUser({
      username: form_data.get("username") as string,
      password: form_data.get("password") as string
    }).then(async (res) => {
      if (!res.ok) return this.setState({ "reg-color": "danger", "reg-message": await res.text() });

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

      this.setState({
        "log-color": "success",
        "log-message": "Registration Successful! Please Login below."
      });
    });
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
                <ModalClose className="btn-close" />
              </div>
              <div className="tab-content">
                <ModalForm
                  body={
                    <>
                      {this.state["log-message"] && (
                        <Alert color={this.state["log-color"]}>{this.state["log-message"]}</Alert>
                      )}
                      <ModalFormInputColumn
                        input-autoComplete="username"
                        input-id={`${TopBarUserLogReg.log_id}-${TopBarUserLogReg.username_name}`}
                        input-name={TopBarUserLogReg.username_name}
                        input-required
                        input-type="text"
                        label-bi-icon="person-fill"
                      >
                        Username
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-autoComplete="current-password"
                        input-id={`${TopBarUserLogReg.log_id}-${TopBarUserLogReg.password_name}`}
                        input-name={TopBarUserLogReg.password_name}
                        input-required
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
                      {this.state["reg-message"] && (
                        <Alert color={this.state["reg-color"]}>{this.state["reg-message"]}</Alert>
                      )}
                      <ModalFormInputColumn
                        input-autoComplete="username"
                        input-id={`${TopBarUserLogReg.reg_id}-${TopBarUserLogReg.username_name}`}
                        input-name={TopBarUserLogReg.username_name}
                        input-required
                        input-type="text"
                        label-bi-icon="person-fill"
                      >
                        Username
                      </ModalFormInputColumn>
                      <ModalFormInputColumn
                        input-autoComplete="new-password"
                        input-id={`${TopBarUserLogReg.reg_id}-${TopBarUserLogReg.password_name}`}
                        input-name={TopBarUserLogReg.password_name}
                        input-required
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
                        input-required
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
