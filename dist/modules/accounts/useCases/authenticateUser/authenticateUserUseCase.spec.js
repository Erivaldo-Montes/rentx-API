"use strict";

var _usersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/usersRepositoryInMemory");

var _usersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/usersTokensRepositoryInMemory");

var _dayjsDateProvider = require("@shared/container/providers/dateProvider/implementations/dayjsDateProvider");

var _appError = require("@shared/errors/appError");

var _createUserUseCase = require("../createUser/createUserUseCase");

var _authenticateUserUseCase = require("./authenticateUserUseCase");

let authenticateUserUseCase;
let userRepository;
let createUserUseCase;
let usersTokensRepository;
let dayjsDateProvider;
describe("authenticate user", () => {
  beforeEach(() => {
    userRepository = new _usersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepository = new _usersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    createUserUseCase = new _createUserUseCase.CreateUserUseCase(userRepository);
    dayjsDateProvider = new _dayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _authenticateUserUseCase.AuthenticateUserUseCase(userRepository, usersTokensRepository, dayjsDateProvider);
  });
  it("should be able authenticate an user", async () => {
    const user = {
      name: "user",
      email: "user@email.com",
      password: "password",
      driver_license: "123ABC"
    };
    await createUserUseCase.execute(user);
    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(response).toHaveProperty("token");
  });
  it("should not be able authenticate a non existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@gmail.com",
      password: "password"
    })).rejects.toEqual(new _appError.AppError("email or password incorrect"));
  });
  it("should not able authenticate with incorrect password", async () => {
    const user = {
      name: "user2",
      email: "user2@email.com",
      password: "password2",
      driver_license: "1234BC"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "pass"
    })).rejects.toEqual(new _appError.AppError("email or password incorrect"));
  });
});