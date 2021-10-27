import { config } from "dotenv-safe";
import express, { static as serve } from "express";

// Initialize environment variables.
config();

express()
  .use(serve("public"))
  .listen(+(<string>process.env["PORT"]), <string>process.env["ADDRESS"]);
