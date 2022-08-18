import { Router } from "express";

import { recipes_router } from "./recipes.router";

export const api_router = Router();

api_router.use("/recipes", recipes_router);
