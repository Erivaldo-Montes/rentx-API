import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUser";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import appDataSource from "../../../../../database";
import { User } from "../entities/user";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      id,
      avatar,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
