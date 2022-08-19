import { hash } from "bcryptjs";
import dynamoose from "dynamoose";

import type { UserItem } from "./User.types";

import { bcrypt_config } from "configs";

import { rangeKey } from "./helpers";

export const User = dynamoose.model<UserItem>("user", {
  id: String,
  username: rangeKey,
  password: {
    type: String,
    set: (password) => hash(<string>password, bcrypt_config.salt)
  }
});
