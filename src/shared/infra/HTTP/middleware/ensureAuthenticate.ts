import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/usersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typorm/repositories/usersTokensRepository";
import { AppError } from "@shared/errors/appError";

export async function ensureAutheticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  const usersTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token);

    const user = await usersTokenRepository.findByUserIdAndRefreshToken(
      user_id as string,
      token,
    );

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
