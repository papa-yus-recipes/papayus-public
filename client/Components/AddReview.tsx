import React, { FormEvent } from "react";

import type { AddReviewProps } from "./AddReview.types";

import { createReview } from "../requests/users.requests";

import Rating from "./Rating";

export default class AddReview extends React.Component<AddReviewProps> {
  static comment_name = "comment";

  constructor(props: AddReviewProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  private onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const form_data = new FormData(form);
    return createReview({
      comment: form_data.get(AddReview.comment_name) as string,
      rating: form_data.get(Rating.html_name) as string,
      recipe: this.props["recipe-id"]
    }).then((res) => res.ok && window.location.reload());
  }

  override render() {
    return (
      <form className="mb-3" onSubmit={this.onSubmit}>
        <div className="align-items-center d-flex">
          <header className="fs-5 mb-0 me-2">Add a review:</header>
          <Rating font-size={3} className="mb-1" id="review-rating" />
        </div>
        <input
          className="form-control"
          name={AddReview.comment_name}
          placeholder="Comment..."
          type="text"
        />
      </form>
    );
  }
}
