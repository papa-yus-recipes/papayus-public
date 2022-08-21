import type { Validators } from "./type";
import type { ReviewData, ReviewRecipeNUser } from "db/Models/Review.types";
import type { UserReviewsPostBody } from "routers/users.types";

import { InvalidError } from "NextError";

import { between, isString, isUuid } from "./helpers";

const validators: Validators<keyof UserReviewsPostBody> = {
  comment: (v) => isString(v) && between((<string>v).length, 1, 150),
  rating: (v: number) => Number.isInteger(v) && between(v, 1, 5),
  recipe: isUuid
};

export const validateUserReviewsPostBody = ({
  comment,
  rating,
  recipe
}: UserReviewsPostBody): ReviewData & Pick<ReviewRecipeNUser, "recipe"> => {
  const body = { comment, rating: +(<string>rating), recipe };
  for (const key in body)
    if (!validators[<keyof UserReviewsPostBody>key](body[<keyof UserReviewsPostBody>key]))
      throw InvalidError(key);

  return <ReviewData & Pick<ReviewRecipeNUser, "recipe">>body;
};
