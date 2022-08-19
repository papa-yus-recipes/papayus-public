import React from "react";

import Link from "./Link";
import TopBarLogo from "./Logo";
import TopBarSearchBar from "./SearchBar";
import TopBarUser from "./User";

import "./index.css";

export default class TopBar extends React.Component {
  static id = "top-bar";
  static collapse_id = `${TopBar.id}-collapse`;

  override render() {
    return (
      <div className="bg-light border-bottom border-top border-secondary navbar navbar-expand-lg navbar-light mb-4 px-3 py-0">
        <div className="align-items-center d-flex flex-column flex-lg-row justify-content-between my-lg-0 w-100">
          <div className="bg-white align-items-center border-end border-start border-dark d-flex justify-content-center">
            <TopBarLogo />
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
            <TopBarSearchBar />
            <TopBarUser />
          </div>
        </div>
      </div>
    );
  }
}
