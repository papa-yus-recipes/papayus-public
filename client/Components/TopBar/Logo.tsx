import React from "react";

import "./Logo.css";

export default class Logo extends React.Component {
  override render() {
    return (
      <a
        className="border-dark fs-4 fw-bolder mb-0 mx-5 mx-lg-0 navbar-brand py-auto text-center text-primary"
        href="/"
        id="logo"
      >
        Papa Yu's
      </a>
    );
  }
}
