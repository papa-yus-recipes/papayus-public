import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

import { between, id } from "./helpers";

interface IUser extends Document {
  id: string;
  username: string;
  password: string;
}

export const User = dynamoose.model<IUser>(
  "user",
  new dynamoose.Schema({
    id,
    username: {
      type: String,
      rangeKey: true,
      validate: (username) => username === "_" || between((<string>username).length, 3, 30),
      default: "_"
    },
    password: String
  }),
  { create: aws_config.dynamodb_config.create }
);
