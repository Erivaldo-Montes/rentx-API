import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/usersRepository";
import { AppError } from "@shared/errors/appError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user.admin) {
    throw new AppError("user is not admin", 401);
  }

  return next();
}
