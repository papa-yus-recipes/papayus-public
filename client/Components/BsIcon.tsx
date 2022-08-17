import React from "react";

type BsIconProps = {
  className?: string;
  icon: string;
  size: number;
};

export default class BsIcon extends React.Component<BsIconProps> {
  override render() {
    return (
      <i
        className={`d-inline-flex bi-${this.props.icon} fs-${this.props.size} ${
          this.props.className && this.props.className
        }`}
      ></i>
    );
  }
}
