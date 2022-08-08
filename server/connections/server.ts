import express, { static as serve } from "express";

export const server = express();

server.use(serve("public"));
