import type { Validators } from "./type";
import type { UserData } from "db/Models/User.types";
import type { UsersLoginPostBody, UsersPostBody } from "routers/users.types";

import { InvalidError } from "NextError";

import { between, isString } from "./helpers";

const validators: Validators<keyof UsersPostBody | keyof UsersLoginPostBody> = {
  password: (v) => isString(v) && between(v.length, 8, 50),
  username: (v) => isString(v) && between(v.length, 3, 20)
};

export const validateUsersPostBody = ({ password, username }: UsersPostBody): UserData => {
  const body = { password, username };
  for (const key in body)
    if (!validators[<keyof UsersPostBody>key](body[<keyof UsersPostBody>key]))
      throw InvalidError(key);

  return <UserData>body;
};

export const validateUsersLoginPostBody = ({
  password,
  username
}: UsersLoginPostBody): UserData => {
  const body = { password, username };
  for (const key in body)
    if (!validators[<keyof UsersLoginPostBody>key](body[<keyof UsersLoginPostBody>key]))
      throw InvalidError(key);

  return <UserData>body;
};
