"use strict";

var _usersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/usersRepositoryInMemory");

var _usersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/usersTokensRepositoryInMemory");

var _dayjsDateProvider = require("@shared/container/providers/dateProvider/implementations/dayjsDateProvider");

var _mailProviderInMemory = require("@shared/container/providers/MailProvider/inMemory/mailProviderInMemory");

var _appError = require("@shared/errors/appError");

var _sendForgotPasswordMailUseCase = require("./sendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepository;
let usersTokensRepository;
let dayjsDateProvider;
let mailProvider;
describe("send forgot password mail", () => {
  beforeEach(() => {
    usersRepository = new _usersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepository = new _usersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dayjsDateProvider = new _dayjsDateProvider.DayjsDateProvider();
    mailProvider = new _mailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _sendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepository, usersTokensRepository, dayjsDateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail to user", async () => {
    const mailProviderSpy = jest.spyOn(mailProvider, "sendMail");
    await usersRepository.create({
      name: "José Alfonso",
      email: "unit@gmail.com.br",
      driver_license: "000123456789",
      password: "password123"
    });
    await sendForgotPasswordMailUseCase.execute("unit@gmail.com.br");
    expect(mailProviderSpy).toHaveBeenCalled();
  });
  it("Should not be able to send a forgot password mail if user does not exist", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("palhacogozo@hot.com")).rejects.toEqual(new _appError.AppError("user does not exist"));
  });
  it("Should be able to create an user token", async () => {
    const generateToken = jest.spyOn(usersTokensRepository, "create");
    await usersRepository.create({
      name: "Henrique Bittencourt",
      email: "bitzinho@gmail.com.br",
      driver_license: "000341135843",
      password: "password001"
    });
    await sendForgotPasswordMailUseCase.execute("bitzinho@gmail.com.br");
    expect(generateToken).toHaveBeenCalled();
  });
});