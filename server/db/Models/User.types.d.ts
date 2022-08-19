import type { Item, HasId } from "./types";

export interface IUser extends HasId {
  username: string;
  password: string;
}

export type UserItem = Item<IUser>;

export type IUserReference = Pick<IUser, "id" | "username">;
