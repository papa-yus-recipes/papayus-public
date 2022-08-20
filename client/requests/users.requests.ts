import type { UserData } from "./users.types";

import { post } from "./helpers";

export const createUser = (data: UserData) => post(`users`, { body: new URLSearchParams(data) });

export const login = (data: UserData) => post(`users/login`, { body: new URLSearchParams(data) });
