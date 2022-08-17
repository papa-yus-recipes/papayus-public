import React from "react";

import type { NeverRecord } from "../types";

import BsIcon from "../BsIcon";

type SearchBarStates = {
  query: string;
};

export default class SearchBar extends React.Component<NeverRecord, SearchBarStates> {
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
    window.location.assign(`/search.html?search=${this.state.query}`);
  }

  override render() {
    return (
      <form className="container-fluid mx-lg-4 my-lg-0 my-2 navbar-form" onSubmit={this.onSubmit}>
        <div className="input-group max-min-height">
          <button
            className="align-items-center bg-white border border-end-0 border-dark btn btn-outline-secondary d-flex pe-0 ps-1 py-0 rounded-0"
            title="Search"
            type="submit"
          >
            <BsIcon className="fs-5 mx-3 text-black" icon="search" />
          </button>
          <input
            className="border-bottom border-top border-dark form-control fs-5 rounded-0"
            name="query"
            onChange={this.queryOnChange}
            placeholder="Search"
            type="search"
          />
          <button
            className="align-items-center bg-white border border-start-0 border-dark btn btn-outline-secondary d-flex ps-0 pe-1 py-0 rounded-0"
            title="Filter"
            type="button"
          >
            <BsIcon className="fs-3 mx-3 text-black" icon="filter" />
          </button>
        </div>
      </form>
    );
  }
}
