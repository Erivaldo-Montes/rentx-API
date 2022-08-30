import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./devolutionRentalUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const devolitionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolitionRentalUseCase.execute({
      user_id,
      id,
    });
    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
