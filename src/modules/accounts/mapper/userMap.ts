import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../DTOs/IUserResponseDTO";
import { User } from "../infra/typorm/entities/user";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    // pega os exposes da classe
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
