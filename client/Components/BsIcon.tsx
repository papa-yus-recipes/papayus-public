import React from "react";

type BsIconProps = {
  icon: string;
  className?: string;
};

export default class BsIcon extends React.Component<BsIconProps> {
  override render() {
    return (
      <i
        className={`d-inline-flex bi-${this.props.icon} ${
          this.props.className && this.props.className
        }`}
      ></i>
    );
  }
}
