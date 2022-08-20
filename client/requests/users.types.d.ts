import type { HasId } from "./types";

export type UserKey = HasId["id"];

export type UserUsername = string;

export type UserData = { username: UserUsername; password: string };

export type User = { id: UserKey } & UserData;
