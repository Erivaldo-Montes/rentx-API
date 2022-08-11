import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../error/appError";
import { ICreateUserDTO } from "../../DTOs/ICreateUser";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
