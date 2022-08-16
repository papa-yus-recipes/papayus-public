import { hash } from "bcryptjs";
import dynamoose from "dynamoose";

import type { UserDoc } from "./User.types";

import { aws_config, bcrypt_config } from "configs";

import { rangeKey } from "./helpers";

export const User = dynamoose.model<UserDoc>(
  "user",
  new dynamoose.Schema({
    id: String,
    username: rangeKey,
    password: {
      type: String,
      set: (password) => hash(<string>password, bcrypt_config.salt)
    }
  }),
  { create: aws_config.dynamodb_config.create }
);
