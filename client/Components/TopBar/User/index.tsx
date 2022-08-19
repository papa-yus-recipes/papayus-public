import React from "react";

import type { NeverRecord } from "../../types";
import type { TopBarUserStates } from "./index.types";

import { getCookies } from "../../../helpers";
import BsIcon from "../../BsIcon";

import "./index.css";
import TopBarUserLogReg from "./LogReg";

export default class TopBarUser extends React.Component<NeverRecord, TopBarUserStates> {
  static id = "user";
  static username_id = `${TopBarUser.id}-username`;

  constructor(props: never) {
    super(props);

    this.state = getCookies("id", "username") as TopBarUserStates;
  }

  get loggedIn() {
    return Boolean(this.state.id && this.state.username);
  }

  override componentDidMount() {
    if (this.loggedIn)
      (document.getElementById("bookmarks-toggle-overline") as HTMLSpanElement).style.width = `${
        (document.getElementById(TopBarUser.username_id) as HTMLSpanElement).clientWidth
      }px`;
  }

  override render() {
    return (
      <div
        className="align-items-center d-flex flex-grow-1 flex-lg-grow-0 justify-content-center justify-content-lg-end mb-3 mb-lg-0"
        id={TopBarUser.id}
      >
        {this.loggedIn ? (
          <>
            <span className="me-1 overflow-hidden" id={TopBarUser.username_id}>
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
          <TopBarUserLogReg />
        )}
      </div>
    );
  }
}
