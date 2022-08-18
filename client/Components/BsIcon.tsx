import React from "react";

type BsIconProps = {
  "className"?: string;
  "icon": string;
  "font-size": number;
};

export default class BsIcon extends React.Component<BsIconProps> {
  override render() {
    let className = `d-inline-flex bi-${this.props.icon} fs-${this.props["font-size"]}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return <i className={className}></i>;
  }
}
