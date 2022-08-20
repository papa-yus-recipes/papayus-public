import { compare } from "bcryptjs";
import { Request, Response, Router } from "express";
import { sign, verify } from "jsonwebtoken";

import type { NeverRecord } from "./types";
import type { UsersLoginPostBody, UsersPostBody } from "./users.types";
import type { User } from "db/Models/User.types";

import { InvalidError, UnauthenticatedError, UnauthorizedError } from "NextError";
import { secrets_manager } from "connections";
import { createUser, getUserByUsername } from "db";
import { validateUsersLoginPostBody, validateUsersPostBody } from "validation";

import { catchNext, cookie } from "./helpers";

export const users_router = Router();

users_router.post("/", (req: Request<NeverRecord, User, UsersPostBody>, res, next) =>
  catchNext(
    async () => res.send(<User>(await createUser(validateUsersPostBody(req.body))).toJSON()),
    next
  )
);

type JwtPayload = { id: string };

const generateAccessToken = (res: Response, payload: JwtPayload, secret: string) =>
  cookie(res, "access_token", sign(payload, secret, { expiresIn: 600 }));

users_router.post(
  "/login",
  (req: Request<NeverRecord, NeverRecord, UsersLoginPostBody>, res, next) =>
    catchNext(async () => {
      const { password, username } = validateUsersLoginPostBody(req.body);

      const user = await getUserByUsername(username);
      if (!user) throw InvalidError("username or password");
      if (!(await compare(password, user.password))) throw InvalidError("username or password");

      const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } =
        await secrets_manager.getJwtWebTokenSecrets();

      cookie(res, "id", user.id);
      cookie(res, "username", user.username);
      const payload = { id: user.id };
      generateAccessToken(res, payload, JWT_ACCESS_TOKEN_SECRET);
      cookie(res, "refresh_token", sign(payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: 86400 }));
      res.sendStatus(200);
    }, next)
);

const user_router = Router({ mergeParams: true });
users_router.use("/:id", user_router);

user_router.use(
  (req: Request<{ id: string }, NeverRecord, { refresh_token?: string }>, res, next) =>
    catchNext(async () => {
      const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } =
        await secrets_manager.getJwtWebTokenSecrets();

      const access_token = req.headers.authorization?.split(" ")[1];
      if (!access_token) throw UnauthenticatedError();

      verify(access_token, JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (!req.body.refresh_token) throw UnauthenticatedError();
          verify(req.body.refresh_token, JWT_REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) throw UnauthorizedError();
            generateAccessToken(res, { id: (<JwtPayload>payload).id }, JWT_ACCESS_TOKEN_SECRET);
          });
          return next();
        }

        if (req.params.id !== (<JwtPayload>payload).id) throw UnauthorizedError();
      });

      next();
    }, next)
);

user_router.post("/logout", (_, res) => {
  res.clearCookie("id");
  res.clearCookie("username");
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.sendStatus(204);
});
