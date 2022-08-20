import type { Unknown } from "./types";
import type { UserData } from "db/Models/User.types";

export type UsersPostBody = Unknown<UserData>;

export type UsersLoginPostBody = Unknown<UserData>;
