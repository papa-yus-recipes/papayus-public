import React from "react";

type LinkProps = {
  href: string;
  children?: any;
};

export default class Link extends React.Component<LinkProps> {
  override render() {
    return (
      <a
        className="d-flex fs-5 justify-content-center ms-lg-3 mt-2 mt-lg-0 text-dark text-decoration-none"
        href={this.props.href}
      >
        {this.props.children}
      </a>
    );
  }
}
