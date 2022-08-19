import React from "react";

import type { NeverRecord } from "../types";
import type { TopBarSearchBarStates } from "./SearchBar.types";

import { searchUrl } from "../../helpers";
import BsIcon from "../BsIcon";

export default class TopBarSearchBar extends React.Component<NeverRecord, TopBarSearchBarStates> {
  constructor(props: never) {
    super(props);

    this.queryOnChange = this.queryOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  queryOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ query: ev.target.value });
  }

  onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    window.location.assign(searchUrl({ query: this.state.query }));
  }

  override render() {
    return (
      <form
        className="d-flex flex-grow-1 mx-lg-4 my-lg-0 my-3 navbar-form px-0"
        onSubmit={this.onSubmit}
      >
        <div className="input-group">
          <button
            className="align-items-center bg-white border border-end-0 border-secondary btn btn-outline-secondary d-flex pe-0 ps-1 py-0 rounded-0"
            title="Search"
            type="submit"
          >
            <BsIcon className="mx-3 text-black" font-size={5} icon="search" />
          </button>
          <input
            className="border-bottom border-top border-secondary form-control rounded-0"
            name="query"
            onChange={this.queryOnChange}
            placeholder="Search"
            type="search"
          />
          <button
            className="align-items-center bg-white border border-start-0 border-secondary btn btn-outline-secondary d-flex ps-0 pe-1 py-0 rounded-0"
            title="Filter"
            type="button"
          >
            <BsIcon className="mx-3 text-black" font-size={3} icon="filter" />
          </button>
        </div>
      </form>
    );
  }
}
