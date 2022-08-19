import React from "react";

import type { Tag as TagType } from "../requests/tags.types";
import type { TagProps } from "./Tag.types";

import { rgbToString, searchUrl, wordToColor } from "../helpers";

import "./Tag.css";

export default class Tag extends React.Component<TagProps> {
  #id: string;

  constructor(props: TagProps) {
    super(props);

    this.#id = `tag-${props.tag.name.toLowerCase().replace(/\s+/, "-")}`;
  }

  override componentDidMount() {
    (document.getElementById(this.#id) as HTMLAnchorElement).style.background = rgbToString(
      wordToColor(this.props.tag.category)
    );
  }

  override render() {
    return (
      <a
        className="rounded-pill tag text-decoration-none text-white"
        href={searchUrl({ tags: [this.props.tag.name] })}
        id={this.#id}
      >
        <small>#{this.props.tag.name}</small>
      </a>
    );
  }
}

export const renderTags = (tags: TagType[]) =>
  tags
    .sort((a, b) => +a.category - +b.category || +a.name - +b.name)
    .map((tag, i) => <Tag key={i} tag={tag} />);
