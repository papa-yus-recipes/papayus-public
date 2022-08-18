import React from "react";

import type { H1Props } from "./H1.types";

export default class H1 extends React.Component<H1Props> {
  override render() {
    return <h1 className="mb-4 text-center">{this.props.children}</h1>;
  }
}
