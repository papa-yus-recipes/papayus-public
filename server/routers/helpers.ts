import type { NextFunction } from "express";

export const catchNext = (fn: () => Promise<any>, next: NextFunction) => fn().catch(next);
