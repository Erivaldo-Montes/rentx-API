import { ICreateUserDTO } from "../DTOs/ICreateUser";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
