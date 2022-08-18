import React from "react";

import type { BsIconProps } from "./BsIcon.types";

export default class BsIcon extends React.Component<BsIconProps> {
  override render() {
    let className = `d-inline-flex bi-${this.props.icon} fs-${this.props["font-size"]}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return <i className={className}></i>;
  }
}
