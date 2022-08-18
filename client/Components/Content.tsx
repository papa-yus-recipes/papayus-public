import React from "react";

import type { ContentProps } from "./Content.types";

import H1 from "./H1";

import "./Content.css";

export default class Content extends React.Component<ContentProps> {
  static id = "content";

  override render() {
    return (
      <div className="mx-auto">
        <H1>{this.props["h1-children"]}</H1>
        {this.props.children}
      </div>
    );
  }
}
