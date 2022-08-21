import React from "react";

import type { RatingProps } from "./Rating.types";

import "./Rating.css";

export default class Rating extends React.Component<RatingProps> {
  static html_name = "rating";

  override componentDidMount() {
    (
      document.getElementById(
        `${this.props.id}-${Number.isSafeInteger(this.props.default) ? this.props.default : 1}`
      ) as HTMLInputElement
    ).checked = true;
  }

  override render() {
    return (
      <fieldset
        className={`rating ${this.props.className}`}
        disabled={this.props.disabled}
        id={this.props.id}
      >
        <input id={`${this.props.id}-1`} name={Rating.html_name} type="radio" value="1" />
        <label htmlFor={`${this.props.id}-1`}>1 star</label>
        <input id={`${this.props.id}-2`} name={Rating.html_name} type="radio" value="2" />
        <label htmlFor={`${this.props.id}-2`}>2 stars</label>
        <input id={`${this.props.id}-3`} name={Rating.html_name} type="radio" value="3" />
        <label htmlFor={`${this.props.id}-3`}>3 stars</label>
        <input id={`${this.props.id}-4`} name={Rating.html_name} type="radio" value="4" />
        <label htmlFor={`${this.props.id}-4`}>4 stars</label>
        <input id={`${this.props.id}-5`} name={Rating.html_name} type="radio" value="5" />
        <label htmlFor={`${this.props.id}-5`}>5 stars</label>

        <div className="stars">
          <label
            className={`fs-${this.props["font-size"]}`}
            htmlFor={`${this.props.id}-1`}
            aria-label="1 star"
            title="1 star"
          ></label>
          <label
            className={`fs-${this.props["font-size"]}`}
            htmlFor={`${this.props.id}-2`}
            aria-label="2 stars"
            title="2 stars"
          ></label>
          <label
            className={`fs-${this.props["font-size"]}`}
            htmlFor={`${this.props.id}-3`}
            aria-label="3 stars"
            title="3 stars"
          ></label>
          <label
            className={`fs-${this.props["font-size"]}`}
            htmlFor={`${this.props.id}-4`}
            aria-label="4 stars"
            title="4 stars"
          ></label>
          <label
            className={`fs-${this.props["font-size"]}`}
            htmlFor={`${this.props.id}-5`}
            aria-label="5 stars"
            title="5 stars"
          ></label>
        </div>
      </fieldset>
    );
  }
}
