import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  refresh_token: string;
  newToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError("refresh token does not exists");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    await this.usersTokensRepository.create({
      expires_date,
      user_id,
      refresh_token,
    });

    return { refresh_token, newToken };
  }
}

export { RefreshTokenUseCase };
