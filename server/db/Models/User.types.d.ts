import type { Item, HasId } from "./types";

export type UserUsername = string;

export type UserKey = HasId & {
  username: UserUsername;
};

export type UserData = { password: string };

export type User = UserKey & UserData;

export type UserItem = Item<User>;
