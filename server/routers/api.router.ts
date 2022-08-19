import { Router } from "express";

import { recipes_router } from "./recipes.router";
import { users_router } from "./users.router";

export const api_router = Router();

api_router.use("/recipes", recipes_router).use("/users", users_router);
