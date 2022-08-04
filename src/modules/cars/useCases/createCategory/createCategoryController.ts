import { Request, Response } from 'express';

import { CreatecategoryUseCase } from './createCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreatecategoryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
