import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";

import { deleteFile } from "../../../../shared/infra/utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  avatar_file: string;
  user_id: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");
    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
