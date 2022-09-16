import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUser";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/usersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/usersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/dayjsDateProvider";
import { AppError } from "@shared/errors/appError";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("authenticate user", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      usersTokensRepository,
      dayjsDateProvider,
    );
  });

  it("should be able authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "user",
      email: "user@email.com",
      password: "password",
      driver_license: "123ABC",
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able authenticate a non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "password",
      }),
    ).rejects.toEqual(new AppError("email or password incorrect"));
  });

  it("should not able authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "user2",
      email: "user2@email.com",
      password: "password2",
      driver_license: "1234BC",
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "pass",
      }),
    ).rejects.toEqual(new AppError("email or password incorrect"));
  });
});
