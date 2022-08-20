import type { CookieOptions, NextFunction, Response } from "express";

export const catchNext = (fn: () => Promise<any>, next: NextFunction) => fn().catch(next);

const expires = new Date("2030-01-01T00:00:00.000Z");

export const cookie = (
  res: Response,
  name: string,
  val: string,
  options: Omit<CookieOptions, "expires"> = {}
) => res.cookie(name, val, { expires, ...options });
