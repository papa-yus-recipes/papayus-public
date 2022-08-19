import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { IUser } from "./Models/User.types";
import type Transaction from "dynamoose/dist/Transaction";

import { User } from "./Models";

type UserKey = Pick<IUser, "id" | "username">;
type UserData = Omit<IUser, "id">;

const usernameId = (username: IUser["username"]) => ({ id: `username#${username}`, username: "_" });
const createUsernameId = (username: IUser["username"]): Transaction => {
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
const deleteUsernameId = (username: IUser["username"]) =>
  User.transaction.delete(usernameId(username));

export const createUser = async (data: UserData) => {
  const user = { id: randomUUID(), ...data };
  await transaction([User.transaction.create(user), createUsernameId(data.username)]);
  return new User(user);
};

export const getUser = (key: UserKey) => User.get(key);

export const updateUser = async (key: UserKey, update: Partial<Omit<UserData, "username">>) =>
  User.update(key, update);

export const deleteUser = async (key: UserKey) =>
  transaction([User.transaction.delete(key), deleteUsernameId(key.username)]);
