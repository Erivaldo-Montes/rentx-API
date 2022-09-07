import { randomUUID } from "crypto";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/appError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("user does not exist");
    }

    const token = randomUUID();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    await this.mailProvider.sendMail(
      email,
      "Recuperaçâo de senha",
      `O link para o recuperação é ${token}`,
    );
  }
}

export { SendForgotPasswordMailUseCase };
