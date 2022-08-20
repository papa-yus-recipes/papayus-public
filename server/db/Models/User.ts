import { hash } from "bcryptjs";
import dynamoose from "dynamoose";

import type { UserItem } from "./User.types";

import { bcrypt_config } from "configs";

export const User = dynamoose.model<UserItem>(
  "user",
  {
    id: String,
    username: {
      type: String,
      index: {
        type: "global"
      }
    },
    password: {
      type: String,
      set: (password) => hash(<string>password, bcrypt_config.salt)
    }
  },
  { create: true }
);
