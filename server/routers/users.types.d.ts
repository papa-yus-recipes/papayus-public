import type { Unknown } from "./types";
import type { ReviewData, ReviewRecipeNUser } from "db/Models/Review.types";
import type { UserData } from "db/Models/User.types";

export type UsersPostBody = Unknown<UserData>;

export type UsersLoginPostBody = Unknown<UserData>;

export type UserParams = { id: string };

export type UserReviewsPostBody = Unknown<ReviewData & Pick<ReviewRecipeNUser, "recipe">>;
