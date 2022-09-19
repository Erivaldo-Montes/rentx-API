import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/DTOs/IUserResponseDTO";
import { User } from "@modules/accounts/infra/typorm/entities/user";
import { UserMap } from "@modules/accounts/mapper/userMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class UserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
