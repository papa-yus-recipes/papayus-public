import React from "react";

import type { SectionProps } from "./Section.types";

export default class Section extends React.Component<SectionProps> {
  override render() {
    return (
      <section
        className="mb-4"
        data-title={this.props.title}
        id={[...this.props.title.toLowerCase().split(/\s+/), "section"].join("-")}
      >
        {this.props.children}
      </section>
    );
  }
}
