import React from "react";

import type { TagProps } from "./Tag.types";

import { search } from "../helpers";

import "./Tag.css";

export default class Tag extends React.Component<TagProps> {
  override render() {
    return (
      <a
        className="bg-secondary fs-6 rounded-pill tag text-decoration-none text-white"
        href={search({ tags: [this.props.tag.name] })}
      >
        #{this.props.tag.name}
      </a>
    );
  }
}
