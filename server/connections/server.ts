import express, { ErrorRequestHandler, static as serve, urlencoded } from "express";

import NextError from "NextError";
import { api_router } from "routers/api.router";

export const server = express();

server.use(serve("public")).use(urlencoded({ extended: true }));

server.use("/api", api_router);

// NextError Handling
server.use(<ErrorRequestHandler>((err, _, res, next) => {
  console.log(err);
  if (err instanceof NextError) {
    const { status_code, message } = err;
    return res.status(status_code).send(message);
  }
  if (err instanceof Error) return res.status(500).send(err.name);
  next(err);
}));
