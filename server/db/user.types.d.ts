import type { UserData, UserUsername } from "./Models/User.types";

export type CreateUserOptions = { username: UserUsername } & UserData;
