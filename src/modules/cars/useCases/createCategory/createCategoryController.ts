import { Request, Response } from 'express';

import { CreatecategoryUseCase } from './createCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreatecategoryUseCase) {}
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
