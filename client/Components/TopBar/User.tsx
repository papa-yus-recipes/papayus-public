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
  static id = "user";
  static username_id = `${User.id}-username`;
  static underline_id = `${User.id}-underline`;

  constructor(props: never) {
    super(props);

    this.state = getCookies("id", "username") as UserStates;
  }

  get loggedIn() {
    return Boolean(this.state.id && this.state.username);
  }

  override componentDidMount() {
    (document.getElementById("bookmarks-toggle-overline") as HTMLSpanElement).style.width = `${
      (document.getElementById(User.username_id) as HTMLSpanElement).clientWidth
    }px`;
  }

  override render() {
    return (
      <div
        className="align-items-center d-flex flex-grow-1 flex-lg-grow-0 justify-content-center justify-content-lg-end mb-3 mb-lg-0"
        id={User.id}
      >
        {this.loggedIn ? (
          <>
            <span className="me-1" id={User.username_id}>
              {this.state.username}
            </span>
            <button
              className="bg-transparent border-0 d-flex p-0 position-absolute text-primary"
              id="bookmarks-toggle"
              title="Toggle Bookmarks"
              type="button"
            >
              <span className="bg-primary position-absolute" id="bookmarks-toggle-overline"></span>
              <BsIcon font-size={3} icon="bookmark-heart-fill" />
            </button>
            <button
              className="align-items-center btn d-flex text-dark"
              id="logout-toggle"
              title="Logout"
              type="button"
            >
              <BsIcon font-size={4} icon="box-arrow-right" />
            </button>
          </>
        ) : (
          <button
            className="align-items-center btn d-flex text-primary"
            id="logreg-toggle"
            title="Login/Register"
            type="button"
          >
            <span className="me-2">Login/Register</span>
            <BsIcon font-size={3} icon="box-arrow-in-left" />
          </button>
        )}
      </div>
    );
  }
}
