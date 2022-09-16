import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/usersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/usersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/dayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/mailProviderInMemory";
import { AppError } from "@shared/errors/appError";

import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("send forgot password mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dayjsDateProvider,
      mailProvider,
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const mailProviderSpy = jest.spyOn(mailProvider, "sendMail");
    await usersRepository.create({
      name: "José Alfonso",
      email: "unit@gmail.com.br",
      driver_license: "000123456789",
      password: "password123",
    });

    await sendForgotPasswordMailUseCase.execute("unit@gmail.com.br");

    expect(mailProviderSpy).toHaveBeenCalled();
  });

  it("Should not be able to send a forgot password mail if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("palhacogozo@hot.com"),
    ).rejects.toEqual(new AppError("user does not exist"));
  });

  it("Should be able to create an user token", async () => {
    const generateToken = jest.spyOn(usersTokensRepository, "create");
    await usersRepository.create({
      name: "Henrique Bittencourt",
      email: "bitzinho@gmail.com.br",
      driver_license: "000341135843",
      password: "password001",
    });

    await sendForgotPasswordMailUseCase.execute("bitzinho@gmail.com.br");

    expect(generateToken).toHaveBeenCalled();
  });
});
