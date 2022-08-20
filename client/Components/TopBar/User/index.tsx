import React from "react";

import type { NeverRecord } from "../../types";
import type { TopBarUserStates } from "./index.types";

import { getCookies } from "../../../helpers";
import BsIcon from "../../BsIcon";

import "./index.css";
import TopBarUserLogReg from "./LogReg";
import TopBarUserLogout from "./Logout";

export default class TopBarUser extends React.Component<NeverRecord, TopBarUserStates> {
  static id = "user";
  static username_id = `${TopBarUser.id}-username`;

  constructor(props: never) {
    super(props);

    const { id, refresh_token, username } = getCookies("id", "refresh_token", "username");
    this.state = this.calculateState(id && refresh_token && username, username);
    this.updateState = this.updateState.bind(this);
  }

  private calculateState(condition: any, username: string | undefined) {
    return condition ? { username } : { username: "" };
  }

  private updateState() {
    const { username } = getCookies("username");
    this.setState(this.calculateState(username, username), this.componentDidMount);
  }

  override componentDidMount() {
    if (this.state.username)
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
        {this.state.username ? (
          <>
            <span className="me-1 overflow-hidden" id={TopBarUser.username_id}>
              {this.state.username}
            </span>
            <button
              className="bg-transparent border-0 d-flex p-0 position-absolute text-primary"
              id="bookmarks-toggle"
              title="Bookmarks"
              type="button"
            >
              <span className="bg-primary position-absolute" id="bookmarks-toggle-overline"></span>
              <BsIcon font-size={3} icon="bookmark-heart-fill" />
            </button>
            <TopBarUserLogout updateState={this.updateState} />
          </>
        ) : (
          <TopBarUserLogReg updateState={this.updateState} />
        )}
      </div>
    );
  }
}
