import React from "react";

import Link from "./Link";
import SearchBar from "./SearchBar";

import "./styles.css";

export default class TopBar extends React.Component {
  static id = "top-bar";
  static collapse_id = `${TopBar.id}-collapse`;

  override render() {
    return (
      <div className="align-items-center d-flex flex-column flex-lg-row justify-content-between my-lg-0 w-100">
        <div className="align-items-center bg-white border border-dark d-flex justify-content-center">
          <a
            className="border-dark fs-4 fw-bolder max-min-height mb-0 mx-5 mx-lg-0 navbar-brand py-auto text-center text-primary"
            href="/"
            id="home"
          >
            Papa Yu's
          </a>
          <button
            className="border-secondary d-lg-none me-2 navbar-toggler"
            title="Collapse Top Bar"
            type="button"
            data-bs-target={`#${TopBar.collapse_id}`}
            data-bs-toggle="collapse"
          >
            <i className="navbar-toggler-icon"></i>
          </button>
        </div>
        <div className="align-items-center collapse navbar-collapse" id={TopBar.collapse_id}>
          <Link href="/glossary.html">Glossary</Link>
          <Link href="/about.html">About</Link>
          <SearchBar />
        </div>
      </div>
    );
  }
}
