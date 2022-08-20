import { compare } from "bcryptjs";
import { Request, Router } from "express";
import { sign } from "jsonwebtoken";

import type { NeverRecord } from "./types";
import type { UsersLoginPostBody, UsersPostBody } from "./users.types";
import type { User } from "db/Models/User.types";

import { InvalidError } from "NextError";
import { secrets_manager } from "connections";
import { createUser, getUserByUsername } from "db";
import { validateUsersLoginPostBody, validateUsersPostBody } from "validation";

import { catchNext } from "./helpers";

export const users_router = Router();

users_router.post("/", (req: Request<NeverRecord, User, UsersPostBody>, res, next) =>
  catchNext(
    async () => res.send(<User>(await createUser(validateUsersPostBody(req.body))).toJSON()),
    next
  )
);

users_router.post("/login", (req: Request<NeverRecord, User, UsersLoginPostBody>, res, next) =>
  catchNext(async () => {
    const { password, username } = validateUsersLoginPostBody(req.body);

    const user = await getUserByUsername(username);
    if (!user) throw InvalidError("username or password");
    if (!(await compare(password, user.password))) throw InvalidError("username or password");

    res.cookie("id", user.id);
    res.cookie("username", user.username);
    res.cookie(
      "access_token",
      sign(username, (await secrets_manager.getJwtWebTokenSecrets())["JWT_ACCESS_TOKEN_SECRET"])
    );
    res.sendStatus(200);
  }, next)
);
