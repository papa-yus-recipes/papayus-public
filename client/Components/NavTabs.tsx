import React from "react";

import type { NavTabsProps } from "./NavTabs.types";

export default class NavTabs extends React.Component<NavTabsProps> {
  override componentDidMount() {
    (
      document.querySelector(`#${this.props.id} > li:first-child > button`) as HTMLButtonElement
    ).classList.add("active");
  }

  override render() {
    return (
      <ul className="nav nav-tabs" id={this.props.id}>
        {this.props.tabs.map(({ id, title }, i) => (
          <li className="nav-item" key={i}>
            <button className="nav-link" data-bs-target={`#${id}`} data-bs-toggle="tab">
              {title}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
