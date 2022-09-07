import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/DTOs/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import appDataSource from "@shared/infra/typeorm";

import { UserToken } from "../entities/userToken";

class UsersTokensRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = appDataSource.getRepository(UserToken);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    return this.repository.findOne({ where: { user_id, refresh_token } });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
