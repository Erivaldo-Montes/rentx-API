import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../DTOs/ICreateUser";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private createUserUsecase: IUsersRepository,
  ) {}
  async execute({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.createUserUsecase.create({
      name,
      username,
      password,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
