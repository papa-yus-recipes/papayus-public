import { randomUUID } from "crypto";
import dynamoose from "dynamoose";

import type { Document } from "dynamoose/dist/Document";

import { aws_config } from "configs";

interface IUser extends Document {
  id: string;
  username: string;
  password: string;
}

export const User = dynamoose.model<IUser>(
  "user",
  new dynamoose.Schema({
    id: {
      type: String,
      default: () => randomUUID()
    },
    username: {
      type: String,
      rangeKey: true,
      validate: (username) => {
        if (username === "_") return true;
        const { length } = <string>username;
        return length >= 3 && length <= 30;
      },
      default: "_"
    },
    password: String
  }),
  { create: aws_config.dynamodb_config.create }
);
