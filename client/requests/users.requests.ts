import type { CreateUserOptions, User } from "./users.types";

import { post } from "./helpers";

export const createUser = (data: CreateUserOptions) =>
  post<User>(`users`, { body: new URLSearchParams(data) });
