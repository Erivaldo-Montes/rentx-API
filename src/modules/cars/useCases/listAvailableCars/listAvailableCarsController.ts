import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand } = request.query;

    const listAvailableUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableUseCase.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string,
    });

    return response.status(200).json(cars);
  }
}

export { ListAvailableCarsController };
