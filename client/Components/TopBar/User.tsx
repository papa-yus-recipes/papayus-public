import React from "react";

import type { NeverRecord } from "../types";

import { getCookies } from "../../helpers";
import BsIcon from "../BsIcon";

import "./User.css";

type UserStates = {
  id?: string;
  username?: string;
};

export default class User extends React.Component<NeverRecord, UserStates> {
  constructor(props: never) {
    super(props);

    this.state = getCookies("id", "username") as UserStates;
  }

  get loggedIn() {
    return Boolean(this.state.id && this.state.username);
  }

  override render() {
    return (
      <div
        className="align-items-center d-flex justify-content-around justify-content-lg-end"
        id="user"
      >
        {this.loggedIn ? (
          <>
            <span className="me-2">{this.state.username}</span>
            <BsIcon className="fs-4" icon="box-arrow-right" />
          </>
        ) : (
          <BsIcon className="fs-3" icon="box-arrow-in-left" />
        )}
      </div>
    );
  }
}
