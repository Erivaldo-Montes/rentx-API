import { Repository } from "typeorm";

import appDataSource from "../../../../database";
import { ICreateUserDTO } from "../../DTOs/ICreateUser";
import { User } from "../../entities/user";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      username,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
