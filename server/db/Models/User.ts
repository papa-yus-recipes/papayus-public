import { hash } from "bcryptjs";
import dynamoose from "dynamoose";

import type { IUser } from "./User.types";
import type { Document } from "dynamoose/dist/Document";

import { aws_config, bcrypt_config } from "configs";

import { rangeKey } from "./helpers";

export const User = dynamoose.model<IUser & Document>(
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
