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
    const emailAlreadyExist = await this.repository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new Error("user already exists");
    }
      name,
      username,
      password,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
