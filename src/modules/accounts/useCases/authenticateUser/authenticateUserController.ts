import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await autheticateUserUseCase.execute({ email, password });

    return response.status(200).json(token);
  }
}

export { AuthenticateUserController };
