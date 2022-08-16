import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/usersRepository";
import { AppError } from "@shared/errors/appError";

export async function ensureAutheticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "jesus");

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id as string);

    if (!user) {
      throw new AppError("user does not exist", 401);
    }

    request.user = {
      id: user_id as string,
    };

    next();
  } catch {
    throw new AppError("invalid token", 401);
  }
}
