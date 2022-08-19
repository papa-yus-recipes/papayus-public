import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { UserData, UserKey, UserUsername } from "./Models/User.types";
import type Transaction from "dynamoose/dist/Transaction";

import { User } from "./Models";

const usernameId = (username: UserUsername) => ({ id: `username#${username}`, username: "_" });
const createUsernameId = (username: UserUsername): Transaction => {
  const username_id = usernameId(username);
  return {
    Put: {
      ConditionExpression: "attribute_not_exists(id)",
      Item: {
        id: { S: username_id.id },
        username: { S: username_id.username }
      },
      TableName: User.name
    }
  };
};
const deleteUsernameId = (username: UserUsername) => User.transaction.delete(usernameId(username));

export const createUser = async (data: { username: UserUsername } & UserData) => {
  const user = { id: randomUUID(), ...data };
  await transaction([User.transaction.create(user), createUsernameId(data.username)]);
  return new User(user);
};

export const getUser = (key: UserKey) => User.get(key);

export const updateUser = async (key: UserKey, update: Partial<UserData>) =>
  User.update(key, update);

export const deleteUser = async (key: UserKey) =>
  transaction([User.transaction.delete(key), deleteUsernameId(key.username)]);
