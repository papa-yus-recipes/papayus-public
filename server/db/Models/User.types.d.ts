import type { Doc, HasId } from "./types";

export interface IUser extends HasId {
  username: string;
  password: string;
}

export type UserDoc = Doc<IUser>;

export type IUserReference = Pick<IUser, "id" | "username">;
