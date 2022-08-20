import { randomUUID } from "crypto";
import { transaction } from "dynamoose";

import type { UserData, UserItem, UserKey, UserUsername } from "./Models/User.types";
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

export const createUser = async (data: UserData) => {
  const user = { id: randomUUID(), ...data };
  await transaction([User.transaction.create(user), createUsernameId(data.username)]);
  return new User(user);
};

export const getUser = (key: UserKey) => User.get(key);

export const getPasswordByUsername = async (username: UserUsername) =>
  (await User.query({ username }).exec())[0]?.["password"];

export function updateUser(
  key: UserKey,
  update: Partial<Omit<UserData, "username">>
): Promise<UserItem>;
export function updateUser(
  key: UserKey,
  update: Partial<Omit<UserData, "username">> & Record<"username", UserUsername>,
  old_username: string
): Promise<null>;
export async function updateUser(
  key: UserKey,
  update: Partial<UserData>,
  old_username?: UserUsername
) {
  return update.username && old_username
    ? transaction([
        User.transaction.update({ id: key }, update),
        deleteUsernameId(old_username),
        createUsernameId(update.username)
      ])
    : User.update(key, update);
}

export const deleteUser = async (key: UserKey, username: UserUsername) =>
  transaction([User.transaction.delete(key), deleteUsernameId(username)]);
