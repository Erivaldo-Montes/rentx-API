import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUser";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/appError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository,
  ) {}
  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyExist = await this.repository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new AppError("user already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.repository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
