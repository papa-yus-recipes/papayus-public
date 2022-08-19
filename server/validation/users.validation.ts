import type { Validators } from "./type";
import type { CreateUserOptions } from "db/user.types";
import type { UsersPostBody } from "routers/users.types";

import { InvalidError } from "NextError";

import { between, isString } from "./helpers";

const validators: Validators<keyof UsersPostBody> = {
  password: (v) => isString(v) && between(v.length, 8, 50),
  username: (v) => isString(v) && between(v.length, 3, 20)
};

export const validateUsersPostBody = ({ password, username }: UsersPostBody): CreateUserOptions => {
  const body = { password, username };
  for (const key in body)
    if (!validators[<keyof UsersPostBody>key](body[<keyof UsersPostBody>key]))
      throw InvalidError(key);

  return <CreateUserOptions>body;
};
