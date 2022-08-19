import { Request, Router } from "express";

import type { NeverRecord } from "./types";
import type { UsersPostBody } from "./users.types";
import type { User } from "db/Models/User.types";

import { createUser } from "db/user.db";
import { validateUsersPostBody } from "validation";

import { catchNext } from "./helpers";

export const users_router = Router();

users_router.post("/", (req: Request<NeverRecord, User, UsersPostBody>, res, next) =>
  catchNext(
    async () => res.send(<User>(await createUser(validateUsersPostBody(req.body))).toJSON()),
    next
  )
);
