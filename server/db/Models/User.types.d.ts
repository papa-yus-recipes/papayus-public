import type { HasId } from "./types";

export interface IUser extends HasId {
  username: string;
  password: string;
}

export type IUserReference = Pick<IUser, "id" | "username">;
